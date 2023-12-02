const express = require('express');
const router = express.Router();

const charaController = require('../controllers/characters');

router.get('/', charaController.getAll);

router.get('/:id', charaController.getSingle);

router.post('/', charaController.createCharacter);

router.put('/:id', charaController.updateCharacter);

router.delete('/:id', charaController.deleteCharacter);

module.exports = router;