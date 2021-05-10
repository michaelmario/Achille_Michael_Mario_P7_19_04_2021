
// MIDDLEWARE AUTH
module.exports = (req, res, next) => { // Vérifie si le token est bon
 
  try {
    if (!req.headers['authorization']) {
      //S'assurer que l'utilisateur est connecté en recherchant les en-têtes d'autorisation
      throw "Merci de vous connecter";
    }
    
    if (req.user.isAdmin !== isAdmin) {
        res.status(401).send('Not allowed')
       }
    
    else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || "Requête non authentifiée !" });
  }
  }
