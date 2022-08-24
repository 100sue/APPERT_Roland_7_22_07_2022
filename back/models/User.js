// Le modèle schema pour l'email et le mot de passe.
// L' email unique est vérifié par la dépendance "plugin uniqueValidator".

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({ 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },

});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);