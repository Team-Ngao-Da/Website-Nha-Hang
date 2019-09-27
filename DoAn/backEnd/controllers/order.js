const express = require('express');
const { check, validationResult } = require('express-validator');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { Order, Menu, TableDetail} = require('./../models/db');
const { Result, PagingResult, ErrorResult } = require('./../utils/base_response');
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
    let sortColumn = 'name';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }

    const offset = page * pageSize;
    if (queryString.length <= 2) {
        Order.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Order.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: Menu, as: 'menu' },{model: TableDetail, as: 'tableDetail'}]
            }).then(orders => {
                return res.json(PagingResult(orders, {
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
            M_ID: req.params.id,
            [Op.or]: [
                { name: { [Op.like]: queryString } },
             
            ]
        };

        Order.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Order.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: Menu, as: 'menu' },{model:TableDetail, as: 'tableDetail'}]
            }).then(orders => {
                return res.json(PagingResult(orders, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            });
        });
    }
});

router.get('/getByCustomerType/:id(\\d+)', (req, res) => {
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
        // conditions
        const whereClause = { M_ID: req.params.id, TD_ID: req.params.id };

        Order.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Order.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: Menu, as: 'menu' },{model:TableDetail, as: 'tableDetail'}]
            }).then(orders => {
                return res.json(PagingResult(orders, {
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
            M_ID: req.params.id,
            TD_ID: req.params.id,
            [Op.or]: [
                { name: { [Op.like]: queryString } },
               
            ]
        };

        Order.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Order.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: Menu, as: 'menu' },{model:TableDetail, as: 'tableDetail'}]
            }).then(customers => {
                return res.json(PagingResult(customers, {
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
   Order.findOne({
        where: { id: req.params.id },
        include: [{ model: Menu, as: 'menu' },{model:TableDetail, as: 'tableDetail'}]
    }).then(order=> {
        if (order!= null) {
            return res.json(Result(order));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});
router.post('/', [
    check('M_ID', 'Invalid number').isNumeric(),
    check('TD_ID', 'Invalid number').isNumeric()
    
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
   Order.create(req.body).then(order => {
        return res.json(Result(order));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', [
    check('M_ID', 'Invalid number').isNumeric(),
    check('TD_ID', 'Invalid number').isNumeric()
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
   Order.findByPk(req.params.id).then(order => {

        if (order != null) {
           order.update({
             
                count: req.body.count
            }).then(order=> {
                return res.json(Result(order));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            return res.status(404).send(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.delete('/:id(\\d+)', (req, res) => {
    Order.destroy({
        where: {
            id: req.params.id
        }
    }).then(order => {
        return res.json(Result(order));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;