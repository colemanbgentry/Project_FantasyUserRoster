const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Characters']
    const result = await mongodb.getDatabase().db().collection('characters').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Characters']
    const userId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('characters').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};


const createCharacter = async (req,res) => {
    //#swagger.tags=['Characters']
    const user = {
        characterId: req.body.characterId,
        characterName: req.body.characterName,
        class: req.body.class,
        level: req.body.level,
        health: req.body.health,
        magicPoints: req.body.magicPoints,
        strength: req.body.strength,
        agility: req.body.agility,
        equipment: Array.isArray(req.body.equipment) ? req.body.equipment : [],
        achievements: Array.isArray(req.body.achievements) ? req.body.achievements : [],
        owner: req.body.owner
    };
    const response = await mongodb.getDatabase().db().collection('characters').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateCharacter = async (req, res) => {
    //#swagger.tags=['Characters']
    const userId = new objectId(req.params.id);
    const user = {
        characterId: req.body.characterId,
        characterName: req.body.characterName,
        class: req.body.class,
        level: req.body.level,
        health: req.body.heatlh,
        magicPoints: req.body.magicPoints,
        strength: req.body.strength,
        agility: req.body.agility,
        equipment: Array.isArray(req.body.equipment) ? req.body.equipment : [],
        achievements: Array.isArray(req.body.achievements) ? req.body.achievements : [],
        owner: req.body.owner
    };
    const response = await mongodb.getDatabase().db().collection('characters').replaceOne({_id:userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

const deleteCharacter = async (req, res) => {
    //#swagger.tags=['Characters']
    const userId = new objectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('characters').remove({ _id: userId}, true);
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createCharacter,
    updateCharacter,
    deleteCharacter
};