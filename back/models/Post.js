const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
  },
  likes: {
    type: Number,
    required: true,
  },
  usersLiked: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('post', postSchema);