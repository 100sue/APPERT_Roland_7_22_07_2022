// Router permet de créer des routeurs individuels :

const express = require('express');
const router = express.Router();
const { validate, checkValidation } = require('../middleware/validator');

const userCtrl = require('../controllers/user');

router.post('/signup', validate, checkValidation, userCtrl.signup);
router.post('/login', validate, checkValidation, userCtrl.login);

module.exports = router;