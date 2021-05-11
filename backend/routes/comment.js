const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

// Ajout d'un nouveau commentaire
router.post("/", auth, commentCtrl.addComment);

router.get("/",  commentCtrl.getAllComments);

// Récupérer les commentaires d'un post
router.get("/from/:id", auth, commentCtrl.getCommentsFromPost);

// Modifier un commentaire
router.put("/:id", auth, commentCtrl.modifyComment);

// Supprimer un commentaire
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
