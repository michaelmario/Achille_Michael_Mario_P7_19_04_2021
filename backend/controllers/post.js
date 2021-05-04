const models = require("../models");
const jwt = require("../utils/jwtValidation");
const fs = require("fs");
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
  destination: './images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Seuls les caractères spéciaux présents dans la régex suivante sont autorisés :
const regex = /^[A-Za-z\d\s.,;:!?"()/%-_'éèêëà#@ô^öù*ç€$£≠÷°]*$/;

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');
// Check File Type
function checkFileType(file, cb) {
  const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif":"gif"
  };
  
  // Allowed ext
  const filetypes = MIME_TYPES[file.mimetype];
  // Check ext
  const extname = file.originalname.split(".")[0].split(" ").join("_");  
  // Check mime
  const mimetype = filetypes;

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}



exports.addPost = (req, res) => {  
    const data = req.body.title;
    const image = req.file;   
      if (image == undefined) {
        res.status(422).json({ msg: 'Error: No File Selected!' });
      } else {

        //console.log(image)
        if (!data || !image || !req.headers.authorization || !regex.test(data)) {
          res.status(400).json({ message: "Requête erronée." });
        } else {
          const token = jwt.getUserId(req.headers.authorization);
          const userId = token.userId;
          models.Post.create({
            title: data,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
              }`,
            UserId: userId,
          })
            .then((post) => {
              models.Post.findOne({
                where: { id: post.id },
                include: [
                  {
                    model: models.User,
                    attributes: ["avatarUrl", "name", "email", "departement", "bio"],
                  },
                ],
              })
                .then((post) => res.status(200).json(post))
                .catch((error) => res.status(404).json(error));
            })
            .catch((error) => res.status(500).json(error));
        }
      }
    }
  


exports.getAllPosts = (req, res) => {
  models.Post.findAll({
    include: [
      {
        model: models.User,
        attributes: ["avatarUrl", "name", "email", "departement", "bio"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(200).json({ message: "Pas de post à afficher" });
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.modifyPost = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      if (req.file == undefined) {
        res.status(422).json({ msg: 'Error: No File Selected!' });
      } else {
        const token = jwt.getUserId(req.headers.authorization);
        const userId = token.userId;
        const postId = req.params.id;

        models.Post.findOne({ where: { id: postId } })
          .then((post) => {
            if (post.userId == userId) {
              const filename = post.imageUrl.split("images/")[1];
              fs.unlinkSync(`images/${filename}`);
             
              models.Post.update(
                {
                  title: req.body.title,
                  imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                    }`,
                  updatedAt: new Date(),
                },
                { where: { id: post.id } }
              )
                .then(() => {
                  models.Post.findOne({
                    where: { id: postId },
                    include: [
                      {
                        model: models.User,
                        attributes: [
                          "avatarUrl",
                          "name",
                          "email",
                          "departement",
                          "bio",
                        ],
                      },
                    ],
                  })
                    .then((post) => res.status(200).json(post))
                    .catch((error) => res.status(404).json(error));
                })
                .catch((error) => res.status(501).json(error));
            } else {
              res.status(403).json({ message: "Action non autorisée." });
            }
          })
          .catch((error) => res.status(500).json(error));
      }
    }
  })
}

exports.deletePost = (req, res) => {
  console.log(req.body)
  if (!req.body.id || !req.headers.authorization) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const isAdmin = token.isAdmin;

    models.Post.findOne({ where: { id: req.body.id } })
      .then((post) => {
        if (post.userId == userId || isAdmin) {
          console.log("--------- delete post");
          console.log("post.imageUrl : ", post.imageUrl);
          if (post.imageUrl) {
            // Supprimer l'image du server
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              models.Post.destroy({
                where: { id: req.body.id },
              })
                .then(() =>
                  res.status(200).json({ message: "Le post a été supprimé !" })
                )
                .catch((err) => res.status(500).json(err));
            });
          } else {
            models.Post.destroy({ where: { id: req.body.id } })
              .then(() =>
                res.status(200).json({ message: "Elément supprimé." })
              )
              .catch((err) => res.status(500).json(err));
          }
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((err) => res.status(500).json(err));
  }
};

exports.like = (req, res, next) => {
  const data = JSON.parse(req.body.data);

  if (!data || !req.headers.authorization || !regex.test(data)) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;

    models.PostLikes.findOne({ where: { UserId: userId, PostId: data } })
      .then((like) => {
        if (like) {
          if (userId === like.userId) {
            models.PostLikes.destroy({ where: { id: like.id } })
              .then(() => {
                res.status(204).json({ message: "Elément supprimé." });
              })
              .catch((error) => res.status(501).json(error));
          } else {
            res.status(403).json({ message: "Action non autorisée." });
          }
        } else {
          models.PostLikes.create({ UserId: userId, PostId: data })
            .then(() => {
              models.PostLikes.findOne({
                where: { UserId: userId, PostId: data },
                include: [
                  {
                    model: models.User,
                    attributes: [
                      "imageUrl",
                      "username",
                      "lastname",
                      "firstname",
                    ],
                  },
                ],
              })
                .then((like) => res.status(200).json(like))
                .catch((error) => res.status(404).json(error));
            })
            .catch((error) => res.status(501).json(error));
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

exports.getLikesFromPost = (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    models.PostLikes.findAll({
      where: { postId: req.params.id },
      include: [
        {
          model: models.User,
          attributes: ["imageUrl", "username", "lastname", "firstname"],
        },
      ],
      order: [["createdAt", "ASC"]],
    })
      .then((likes) => {
        if (likes.length > 0) {
          res.status(200).json(likes);
        } else {
          res.status(200).json({ message: "Aucun élément à afficher." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};



