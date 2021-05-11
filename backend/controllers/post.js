const models = require("../models");
const jwt = require("../utils/jwtValidation");
const fs = require("fs");
const path = require('path');

// Seuls les caractères spéciaux présents dans la régex suivante sont autorisés :
const regex = /^[A-Za-z\d\s.,;:!?"()/%-_'éèêëà#@ô^öù*ç€$£≠÷°]*$/;

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
        const title = regex.test(req.body.title )
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
                  title:title ,
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

exports.deletePost = (req, res) => {
   if (!req.params.id || !req.headers.authorization) {
    res.status(400).json({ message: "Requête incomplète." });
  } else {
    const token = jwt.getUserId(req.headers.authorization);
    const userId = token.userId;
    const isAdmin = req.body.user;
    models.Post.findOne({ where: { id: req.body.id } })
      .then((post) => {
        if (post.userId == userId || isAdmin) {
          console.log(isAdmin)
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
                      "avatarUrl",
                          "name",
                          "email",
                          "departement",
                          "bio",
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
          attributes: ["avatarUrl", "name", "email","departement","bio",],
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



