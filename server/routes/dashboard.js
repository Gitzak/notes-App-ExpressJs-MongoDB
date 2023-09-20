const express = require('express');

const router = express.Router();

const dashboardController = require('./../controllers/dashboardController');

const { isLoggedIn } = require('./../middlewares/checkAuth');

router.get('/dashboard', isLoggedIn, dashboardController.dashboard);

router.get('/dashboard/add-note', isLoggedIn, dashboardController.dashboardAddNote);

router.post('/dashboard/create-note', isLoggedIn, dashboardController.dashboardCreateNote);

router.get('/dashboard/note/:id', isLoggedIn, dashboardController.dashboardViewNote);

router.get('/dashboard/edit-note/:id', isLoggedIn, dashboardController.dashboardEditNote);

router.post('/dashboard/update-note/:id', isLoggedIn, dashboardController.dashboardUpdateNote);

router.post('/dashboard/delete-note/:id', isLoggedIn, dashboardController.dashboardDeleteNote);

module.exports = router;

