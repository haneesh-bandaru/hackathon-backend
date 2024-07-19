const express = require('express');
const router = express.Router();
const empnotcountControllers = require('../controllers/empnotcount.controllers');

router.get('/get-employees-notcount', empnotcountControllers.getEmpNotCount);
//router.post('/post-employees', employeeController.addEmployee);

module.exports = router;