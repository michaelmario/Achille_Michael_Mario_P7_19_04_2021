// MODULES
const express = require("express");
// Appel du routeur avec la méthode mise à disposition par Express


// IMPORTATION CONTROLLERS
const router = express.Router();
const postCtrl = require("../controllers/post");

// IMPORTATION MIDDLEWARES - On importe le middleware auth pour sécuriser les routes et le middleware multer pour la gestion des images
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête
// FIN IMPORTATION

// Ajouter un nouveau post
router.post("/", auth, multer, postCtrl.addPost);

// Récupérer tous les posts
router.get("/", auth, postCtrl.getAllPosts);

// Modifier un post
router.put("/:id", auth, multer, postCtrl.modifyPost);

// Supprimer un post
router.delete("/:id", auth, postCtrl.deletePost);

// Liker ou disliker un post
router.post("/like", auth, postCtrl.like);

// Récupérer les likes d'un post
router.get("/:id/like", auth, postCtrl.getLikesFromPost);

module.exports = router;
