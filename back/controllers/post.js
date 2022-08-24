// Importation des npm nécessaires .
// "fs" veut dire file-system, c'est ce qui nous permet de modifier et/ou supprimer un fichier.

const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');


// Créer un nouveau post :

exports.createPost = async (req, res, next) => { 
  const newPost = new Post({
    userId: req.body.userId,
    name: req.body.name,
    date: req.body.date,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file !== undefined ? `http://localhost:8080/images/${req.file.filename}` : '',
    likes: 0,
    usersLiked: [],
  })

  try {
    const post = await newPost.save();
    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).send(error)
  }
}

// Modifier un post :

exports.modifyPost = (req, res, next) => { 
  User.findOne({ _id: req.auth.userId })
    .then(user => {
      Post.findOne({ _id: req.params.id })
        .then(post => {

          if (post.userId == user._id || user.role == "admin") {
            const postObject = req.file ?
              {
                title: req.body.title,
                content: req.body.content,
                imageUrl: req.file !== undefined ? `http://localhost:8080/images/${req.file.filename}` : '',
              } : { ...req.body };

            Post.findByIdAndUpdate({ _id: req.params.id }, { ...postObject, })

              .then(post => {

                if (req.file) {
                  const filename = post.imageUrl.split("/images/")[1]
                  fs.unlink(`images/${filename}`, () => {
                    res.status(200).json({ message: 'Post modifié !' });
                  });
                }
              })
              .catch(error => res.status(400).json({ error }));
          } else {
            res.status(401).json({ message: 'Vous n\'avez pas le droit de modifier ce post' })
          }
        }
        )
    }
    )
}

// Effacer un post :

exports.deletePost = (req, res, next) => {
  
  User.findOne({ _id: req.auth.userId })
    .then(user => {
      
      Post.findOne({ _id: req.params.id })
        .then(post => {
         
          if (post.userId == user._id || user.role == "admin") {

            const filename = post.imageUrl.split("/images/")[1]

            fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch((error) => res.status(400).json({ error }))
            });
          } else {
            res.status(401).json({ message: 'Vous n\'avez pas le droit de supprimer ce post' })
          }
        })
        .catch(error => res.status(500).json({ error }))
    }
    )
}

// Avoir un post :

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// Avoir l'ensemble des posts :

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

// Liker un post :

exports.likeAndDislike = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let postId = req.params.id


// Ajout et suppression de like : (en developpement !!)

  switch (like) { 
    case 1:
      Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))
  }
}