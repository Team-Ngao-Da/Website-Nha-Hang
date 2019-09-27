const express = require('express');
const { MaterialType } = require('./../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    // authorize here
    next();
});

// fill customer apis here
router.get('/', (req, res) => {
    MaterialType.findAll().then(types => {
        return res.json(Result(types))
    });
});

router.get('/:id(\\d+)', (req, res) => {
    MaterialType.findByPk(req.params.id).then(type => {
        if (type != null) {
            return res.json(Result(type));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/', (req, res) => {
    //validate data here
    CustomerType.create(req.body).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) => {
    //validate data here
    MaterialType.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                name: req.body.name
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

router.delete('/:id(\\d+)', (req, res) => {
    MaterialType.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;