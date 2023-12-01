const express = require('express');
const router = express.Router();

const charaController = require('../controllers/characters');

router.get('/', charaController.getAll);

router.get('/:id', charaController.getSingle);

module.exports = router;