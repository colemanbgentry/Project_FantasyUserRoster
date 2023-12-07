const express = require('express');
const router = express.Router();

const charaController = require('../controllers/characters');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', charaController.getAll);
router.get('/:id', charaController.getSingle);
router.post('/', isAuthenticated, charaController.createCharacter);
router.put('/:id', isAuthenticated, charaController.updateCharacter);
router.delete('/:id', isAuthenticated, charaController.deleteCharacter);

module.exports = router;