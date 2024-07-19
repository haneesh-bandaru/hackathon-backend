// routes/auth.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controllers');

// Login route
router.post('/', loginController.getLogin);

module.exports = router;
