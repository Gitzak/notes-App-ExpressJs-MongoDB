const express = require('express');

const router = express.Router();

const mainController = require('./../controllers/mainController');

const { checkLoggin } = require('./../middlewares/checkAuth');

router.get('/', checkLoggin, mainController.homepage);
router.get('/about', checkLoggin, mainController.aboutpage);

module.exports = router;

 