const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controllers');

router.post('/post-project', projectController.addProject);
router.get('/get-project', projectController.getAllProjects);

module.exports = router;
