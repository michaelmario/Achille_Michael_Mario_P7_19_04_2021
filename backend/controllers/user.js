// MODULES
//const db = require('../config/database');
const Models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcryptjs = require('bcrypt'); // Pour crypter le mot de passe
const jwt = require("jsonwebtoken"); // Génère un token sécurisé
const fs = require("fs"); // Permet de gérer les fichiers stockés
const jwtoken = require("../utils/jwtValidation");
const multer = require("multer");
const path = require('path');
// Seuls les caractères spéciaux présents dans la régex suivante sont autorisés :
const regex = /^[A-Za-z\d\s.,;:!?"()/%-_'éèêëà#@ô^öù*ç€$£≠÷°]*$/;
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './images/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

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
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
// MIDDLEWARE SIGNUP  - Inscription de l'utilisateur et hashage du mot de passe
exports.signup = (req, res, next) => {
  console.log(req.body);
  Models.User.findOne({where:{email:req.body.email}}).then(result => {
    if(result){
        res.status(409).json({
            message: "Email already exists!",
        });
    }else{
        bcryptjs.genSalt(10, function(err, salt){
            bcryptjs.hash(req.body.password, salt, function(err, hash){
                const user = {
                    name: req.body.name,
                    email:req.body.email,
                    departement:req.body.departement,
                    avatarUrl : '../images/avatar2.png',
                    password: hash
                }
            
                Models.User.create(user).then(result => {
                    res.status(201).json({
                        message: "User created successfully",
                    });
                }).catch(error => {
                    res.status(500).json({
                        message: "Something went wrong!",
                    });
                });
            });
        });
    }
}).catch(error => {
    res.status(500).json({
        message: "Something went wrong!",
    });
});

}


// MIDDLEWARE LOGIN avec vérification de l'email unique
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Models.User.findOne({where:{email: email}}).then(user => {
    if(user === null){
        res.status(401).json({
            message: "Invalid credentials!",
        });
    }else{
        bcryptjs.compare(password, user.password, function(err, result){
            if(result){
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.TOKEN, function(err, token){
                    res.status(200).json({
                        message: "Authentication successful!",
                        token: token
                    });
                });
            }else{
                res.status(401).json({
                    message: "Invalid credentials!",
                });
            }
        });
    }
}).catch(error => {
    res.status(500).json({
        message: "Something went wrong!",
    });
});
};
exports.me = (req, res, next) => {
  const data = JSON.parse(req.body.data);
  if (!data || !regex.test(data)) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = data.userId;

    if (token === "invalid signature") {
      res.status(401).json({ error: "Vous n'êtes pas connecté " });
    } else {
      const userId = token;

      Models.User.findOne({ where: { id: userId } })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json(error));
    }
  }
};
// MIDDLEWARE PROFILE
exports.getProfile = (req, res, next) => {
  const userID = res.locals.userID;
  let userIDAsked = req.params.id;
  if (userIDAsked === userID) {
    Models.User.findOne({ where: { id: userIDAsked } }).then((result) => {
      res.status(200).json(result);
    }).catch((e) => {
      return res.status(500).json(e.message);
    })
  }
}


exports.updateUser = (req, res, next) => {
  const data = req.body;
  if (
    !regex.test(data.name) ||
    !regex.test(data.departement) ||
    !regex.test(data.bio)
  ) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwtoken.getUserId(req.headers.authorization);
    const userId = token.userId;

    Models.User.findOne({ where: { id: userId } })
      .then((user) => {
        if (user.id === userId) {
          //const newUsername = data.firstname + " " + data.lastname;
          Models.User.update(
            {
              email: data.email,
              bio: data.bio,
              name: data.name,
              departement: data.departement,
              updatedAt: new Date(),
            },
            { where: { id: userId } }
          )
            .then(() => {
              Models.User.findOne({ where: { id: userId } })
                .then((user) => res.status(200).json(user))
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

exports.updateProfilPicture = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      if (req.file == undefined) {
        res.status(422).json({ msg: 'Error: No File Selected!' });
      } else {
        const token = jwtoken.getUserId(req.headers.authorization);
        const userId = token.userId;

        Models.User.findOne({ where: { id: userId } })
          .then((user) => {
            if (user.id === userId) {
                Models.User.update(
                {
                  avatarUrl: `${req.protocol}://${req.get("host")}/images/uploads/${req.file.filename
                    }`,
                  updatedAt: new Date(),
                },
                { where: { id: user.id } }
              ).then(() => {
                Models.User.findOne({ where: { id: userId } })
                  .then((user) => res.status(200).json(user))
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


  });

}

exports.deleteUser = (req, res, next) => {
  const paramsId = req.body.id

  if (!paramsId || !req.headers.authorization) {
    res.status(400).json({ message: "Requête erronée." });
  } else {
    const token = jwtoken.getUserId(req.headers.authorization);
    const userId = token.userId;
    const isAdmin = token.isAdmin;

    Models.User.findOne({ where: { id: paramsId } })
      .then((user) => {
        if (user.id == userId || isAdmin) {
          if (user.avatarUrl) {
            // Supprimer la photo de profil du server
            const filename = user.avatarUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Models.User.destroy({ where: { id: user.id } })
                .then(() =>
                  res.status(204).json({ message: "Elément supprimé." })
                )
                .catch((error) => res.status(501).json(error));
            });
          } else {
            Models.User.destroy({ where: { id: user.id } })
              .then(() =>
                res.status(204).json({ message: "Elément supprimé." })
              )
              .catch((error) => res.status(501).json(error));
          }
        } else {
          res.status(403).json({ message: "Action non autorisée." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};
// Retrieve all Users from the database.
exports.findAllUsers = (req, res, next) => {
  Models.User.findAll({
    attributes: {
      exclude: ['password'],
    },
    order: [['id', 'ASC']]
  })
    .then((users) => {

      res.status(200).json(users)
    })
    .catch((error) => res.status(400).json({ error }));
};


// FIN MIDDLEWARE






