
const express = require('express');
const jwt = require('jsonwebtoken');
const helper = require('../utils/helper');
const {TableDetail } = require('../models/db');
const {ErrorResult, Result} = require('../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});
//fillTableDetails apis here
router.get('/', (req, res) => {
   TableDetail.findAll().then(type => {
        res.json(Result(type));
    });
});

//getting a specificTableDetails type
router.get('/:id', (req, res) => {
   TableDetail.findByPk(req.params.id).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404,'Not Found!!'));
        }
    });
});

//creating a newTableDetails type
router.post('/', (req, res) => {
    //validate data
   TableDetail.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400,err.errors));
    });
});

//updating an existedTableDetails type
router.put('/:id', (req, res) => {
    // validate data
   TableDetail.findByPk(req.params.td_id).then(type => {
        if(type != null) {
            type.update({
                position: req.body.position
                
            }).then(type => {
                return res.json(Result(type));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            return res.status(404).send(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.delete('/:id', (req, res) => {
   TableDetail.destroy({
        where: {
            id: req.params.td_id
        }
    }).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;

