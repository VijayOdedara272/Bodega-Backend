const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userRoutes = require('./user');
const controller = require('../controllers/apiController');

router.use('/user', userRoutes);

router.get('/profile', auth, controller.profile);
router.use('/inventory', require('./inventory'));
//router.post('/game/save', auth, controller.saveGame);
//router.get('/game/load', auth, controller.loadGame);

module.exports = router;
