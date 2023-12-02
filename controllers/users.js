const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const createUser = async (req,res) => {
    //#swagger.tags=['Users']
    const user = {
        username: req.body.username,
        email: req.body.email,
        hashedPassword: req.body.hashedPassword,
        characters: Array.isArray(req.body.characters) ? req.body.characters : []
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new objectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        hashedPassword: req.body.hashedPassword,
        characters: Array.isArray(req.body.characters) ? req.body.characters : []
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new objectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};