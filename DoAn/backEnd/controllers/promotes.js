const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op;
const { Menu, Promote} = require('../models/db');
const {Result, PagingResult, ErrorResult} = require('../utils/base_response');
const router = express.Router();

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
    let sortColumn = 'content';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
 
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        Promote.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Promote.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,                
                include: [{ model: Menu,  as: 'menus' }]
            }).then(promote => {
                return res.json(PagingResult(promote, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    } else { // search
        // conditions
        const whereClause = {
            [Op.or]: [
               { content: { [Op.like]: queryString } }
            ]
        };

        Promote.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Promote.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,
                include: [{ model: Menu,  as: 'menus' }]
            }).then(promote => {
                return res.json(PagingResult(promote, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }
});
router.get('/getBymenu/:id(\\d+)',(req,res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'content';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        const whereClause = {M_ID: req.params.id};

        Promote.count({where: whereClause}).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Promote.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,                
                include: [{ model: Menu,  as: 'menus' }]
            }).then(promote => {
                return res.json(PagingResult(promote, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    } else { // search
        // conditions
        const whereClause = {
            [Op.or]: [
               { content: { [Op.like]: queryString } }
            ]
        };

        Promote.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Promote.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,
                include: [{ model: Menu,  as: 'menus' }]
            }).then(promote => {
                return res.json(PagingResult(promote, {
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
    Promote.findOne({ 
        where: {id: req.params.id }, 
        include: [{ model: Menu,  as: 'menus' }]
    }).then(promote => {
        if (promote != null) {
            return res.json(Result(promote));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/',[
    check('M_ID', 'Invalid number').isNumeric(),
    check('discount', 'Invalid number').isNumeric(),
    check('content', 'Required').not().isEmpty(),
    check('dateStart', 'Required').not().isEmpty(),
    check('dateEnd', 'Required').not().isEmpty()
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
    Promote.create(req.body).then(promote => {
        return res.json(Result(promote));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)',[
    check('M_ID', 'Invalid number').isNumeric(),
    check('discount', 'Invalid number').isNumeric(),
    check('content', 'Required').not().isEmpty(),
    check('dateStart', 'Required').not().isEmpty(),
    check('dateEnd', 'Required').not().isEmpty()
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
    Promote.findByPk(req.params.id).then(promote => {
        if (promote != null) {
            Promote.update({
                discount: req.body.discount,
                content: req.body.content,
                dateStart: req.body.dateStart,
                dateEnd:req.body.dateEnd
                
            }).then(promote => {
                return res.json(Result(promote));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            return res.status(404).send(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.delete('/:id(\\d+)', (req, res) => {
    Promote.destroy({
        where: {
            id: req.params.id
        }
    }).then(promote => {
        return res.json(Result(promote));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;