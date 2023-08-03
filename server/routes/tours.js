const express = require('express');
const createTour = require('../controller/tourController');
const router = express.Router();


router.post("/", createTour)


module.exports = router;
