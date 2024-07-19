const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controllers');

router.post('/post-task', taskController.addTask);
router.get('/get-task', taskController.getAllTasks);

module.exports = router;
