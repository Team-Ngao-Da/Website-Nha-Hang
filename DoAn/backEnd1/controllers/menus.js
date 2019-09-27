
const express = require('express');
const { Menu } = require('./../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});
//fill tableDetails apis here
router.get('/', (req, res) => {
    Menu.findAll().then(type => {
        return res.json(Result(type))
    });
});

//getting a specific tableDetails type
router.get('/:id(\\d+)', (req, res) => {
    Menu.findByPk(req.params.id).then(type => {
        if (type != null) {
            return res.json(Result(type));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

//creating a new tableDetails type
router.post('/', (req, res) => {
    //validate data
    Menu.create(req.body).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});


module.exports = router;