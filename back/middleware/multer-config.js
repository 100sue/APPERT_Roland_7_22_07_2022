// Multer est un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP.
// Ici, ce sera les images téléchargées par les users .
// On va traduire les types de fichier pour générer des extensions possibles.
// On enregistre les images téléchargées par le user dans le disk.
// La configuration de multer nécessite deux arguments : destination + filename prenant prenant 3 paramètres chacun.
// Le callback renvoie vers la destination d'enregistrement qui est le dossier images.
// Le nom de fichier a considérer :
// on va créer le nom du fichier (prend le nom d'origine, le split), et on remplace les espaces par des undescores.
// on génère l'extension du fichier et on le renvoie en callback avec le nom du fichier final.

const multer = require('multer');

const MIME_TYPE = { 
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif'
    
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    }
    ,
    filename: (req, file, cb) => {
        console.log("file.originalname: ",file.originalname)
     
        const name = file.originalname.split('.')[0];
    
        const nameFile = name.replace(/\s+/g, '-');
        cb(null, nameFile + Date.now() + '.' + MIME_TYPE[file.mimetype]);//
    }
}
);

// Exportation du  multer en appelant le module storage.

module.exports = multer({ storage: storage,  });