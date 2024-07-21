const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controllers');

router.post('/post-task', taskController.addTask);
router.get('/get-task', taskController.getAllTasks);
router.get('/get-task-status', taskController.getTasksStatus);


module.exports = router;
