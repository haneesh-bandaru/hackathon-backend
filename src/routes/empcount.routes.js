const express = require('express');
const router = express.Router();
const empcountControllers = require('../controllers/empcount.controllers');
// getting count of the emp

router.get('/get-employees-count', empcountControllers.getEmpCount);


module.exports = router;
