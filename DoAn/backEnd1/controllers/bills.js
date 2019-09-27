
const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op;
const { Employee, Bill } = require('./../models/db');
const {Result, PagingResult, ErrorResult} = require('./../utils/base_response');
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
    let sortColumn = 'date';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
 
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        Bill.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Bill.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,                
                include: [{ model: Employee,  as: 'employee' }]
            }).then(bill=> {
                return res.json(PagingResult(bill, {
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
               { date: { [Op.like]: queryString } },
            //    { email: { [Op.like]: queryString } },
            //    { phone: { [Op.like]: queryString } },
            //    { address: { [Op.like]: queryString } }
            ]
        };

        Bill.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Bill.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,
                include: [{ model: Employee,  as: 'employee' }]
            }).then(bill => {
                return res.json(PagingResult(bill, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }
});
// get by Customer Type
router.get('/getByEmployee/:id(\\d+)', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'date';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
 
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        // conditions
        const whereClause = { E_ID: req.params.id };

        Bill.count({where: whereClause}).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Bill.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,                
                include: [{ model: Employee,  as: 'employee' }]
            }).then(bills => {
                return res.json(PagingResult(bills, {
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
            E_ID: req.params.id,
            [Op.or]: [
                { date: { [Op.like]: queryString } }
            ]
        };

        Bill.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Bill.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,
                include: [{ model: Employee,  as: 'employee' }]
            }).then(bills => {
                return res.json(PagingResult(bills ,{
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
    Bill.findOne({ 
        where: {id: req.params.id }, 
        include: [{ model: Employee,  as: 'employees' }]
    }).then(bill => {
        if (bill != null) {
            return res.json(Result(bill));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/', [
    check('B_ID', 'Invalid number').isNumeric(),
    
    check('date', 'Required').not().isEmpty(),
    check('address', 'Required').not().isEmpty(),
    check('payment', 'Invalid number').isNumeric()
],(req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
    Bill.create(req.body).then(bill => {
        return res.json(Result(bill));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', [
    check('B_ID', 'Invalid number').isNumeric(),
    
    check('date', 'Required').not().isEmpty(),
    check('address', 'Required').not().isEmpty(),
    check('payment', 'Invalid number').isNumeric()
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
    Bill.findByPk(req.params.id).then(bill => {
        if (bill != null) {
            Bill.update({
             date: req.body.date,
            payment: req.body.payment
            }).then(bill => {
                return res.json(Result(bill));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            return res.status(404).send(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.delete('/:id(\\d+)', (req, res) => {
    Bill.destroy({
        where: {
            id: req.params.id
        }
    }).then(bill => {
        return res.json(Result(bill));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;