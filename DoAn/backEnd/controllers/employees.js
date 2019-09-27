const express = require('express');
const { check, validationResult } = require('express-validator');
const { Employee } = require('./../models/db');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = express.Router();
const { Result, PagingResult, ErrorResult } = require('./../utils/base_response');
router.use((req, res, next) => {
    // authorize here
    next();
});

// fill customer apis here
router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'name';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        Employee.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Employee.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,               
            }).then(employees => {
                return res.json(PagingResult(employees, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }else { // search
        // conditions
        const whereClause = {
            [Op.or]: [
               { name: { [Op.like]: queryString } },
               { position: { [Op.like]: queryString } }
              
            ]
        };
        Employee.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Employee.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize
            }).then(employees => {
                return res.json(PagingResult(employees, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }
});

router.get('/:id(\\d+)', (req, res) => {
    Employee.findByPk(req.params.id).then(type => {
        if (type != null) {
            return res.json(Result(type));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/',[
    check('name', 'Length from 2 to 100').isLength({min: 2, max: 100}),
    check('position', 'Length from 2 to 100').not().isEmpty(),
    check('gender','Required').not().isEmpty(),
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }

    Employee.create(req.body).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)',[
    check('name', 'Length from 2 to 100').isLength({min: 2, max: 100}),
    check('position', 'Length from 2 to 100').not().isEmpty(),
    check('gender','Required').not().isEmpty(),
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
    Employee.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                name: req.body.name,
                position:req.body.position,
                gender : req.body.gender
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
    Employee.destroy({
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