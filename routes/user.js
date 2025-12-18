const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// /api/user/signup
router.post('/signup', userController.signup);

// /api/user/login
router.post('/login', userController.login);

module.exports = router;
