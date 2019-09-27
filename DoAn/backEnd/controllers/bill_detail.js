const express = require('express');
const { check, validationResult } = require('express-validator');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { Bill, Menu,BillDetail} = require('./../models/db');
const { Result, PagingResult, ErrorResult } = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});

// // fill customer apis here
// router.get('/', (req, res) => {
//     let page = 0;
//     if (req.query.p) page = parseInt(req.query.p);
//     let pageSize = 20;
//     if (req.query.s) pageSize = parseInt(req.query.s);
//     let queryString = '';
//     if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
//     let sortColumn = 'name';
//     let sortDirection = 'ASC';
//     if (req.query.so) {
//         const sortStr = decodeURIComponent(req.query.so).split(' ');
//         sortColumn = sortStr[0];
//         if (sortStr.length == 2) sortDirection = sortStr[1];
//     }

//     const offset = page * pageSize;
//     if (queryString.length <= 2) {
//         BillDetail.count().then(numRow => {
//             const totalRows = numRow;
//             const totalPages = Math.ceil(totalRows / pageSize);
//             BillDetail.findAll({
//                 order: [[sortColumn, sortDirection]],
//                 offset: offset,
//                 limit: pageSize,
//                 include: [{ model: Menu, as: 'menu' }],
//                 include: [{ model: Bill, as: 'bill' }]

//             }).then(billDetail => {
//                 return res.json(PagingResult(billDetail, {
//                     pageNumber: page,
//                     pageSize: pageSize,
//                     totalRows: totalRows,
//                     totalPages: totalPages
//                 }))
//             });
//         });
//     } else { // search
//         // conditions
//         const whereClause = {
//             [Op.or]: [
//                 { name: { [Op.like]: queryString } }
                
//             ]
//         };

//         BillDetail.count({ where: whereClause }).then(numRow => {
//             const totalRows = numRow;
//             const totalPages = Math.ceil(totalRows / pageSize);
//             Customer.findAll({
//                 where: whereClause,
//                 order: [[sortColumn, sortDirection]],
//                 offset: offset,
//                 limit: pageSize,
//                 include: [{ model: Menu, as: 'menu' }],
//                 include: [{ model: Bill, as: 'bill' }],

//             }).then(billDetail => {
//                 return res.json(PagingResult(billDetail, {
//                     pageNumber: page,
//                     pageSize: pageSize,
//                     totalRows: totalRows,
//                     totalPages: totalPages
//                 }))
//             });
//         });
//     }
// });

router.get('/getByBillDetail/:id(\\d+)', (req, res) => {
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
        const whereClause = { M_ID: req.params.id , B_ID: req.params.id};

        BillDetail.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            BillDetail.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: Bill, as: 'bill' },{model:Menu, as: 'menu'}]
            }).then(billDetail=> {
                return res.json(PagingResult(billDetail, {
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
           B_ID: req.params.id,
           M_ID: req.params.id,
            [Op.or]: [
                { name: { [Op.like]: queryString } },
                { email: { [Op.like]: queryString } },
                { phone: { [Op.like]: queryString } },
                { address: { [Op.like]: queryString } }
            ]
        };

        BillDetail.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            BillDetail.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: Bill, as: 'bill' },{model: Menu, as: 'menu'}]
            }).then(billDetail=> {
                return res.json(PagingResult(billDetail, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            });
        });
    }
});

// router.get('/:id(\\d+)', (req, res) => {
//     BillDetail.findOne({
//         where: { B_ID: req.params.id , M_ID: req.params.id},
//         include: [{ model: Menu, as: 'menu' },{model: bill, as: 'bill'}],
//     }).then(billDetail => {
//         if (billDetail != null) {
//             return res.json(Result(billDetail));
//         } else {
//             return res.status(404).json(ErrorResult(404, 'Not Found!'));
//         }
//     });
// });
// router.post('/', [
//     check('CUT_ID', 'Invalid number').isNumeric(),
//     check('name', 'Length from 2 to 100').isLength({ min: 2, max: 100 }),
//     check('email', 'Invalid email').isEmail(),
//     check('address', 'Required').not().isEmpty()
// ], (req, res) => {
//     //validate data here
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json(ErrorResult(422, errors.array()));
//     }
//     Customer.create(req.body).then(customer => {
//         return res.json(Result(customer));
//     }).catch(err => {
//         return res.status(400).send(ErrorResult(400, err.errors));
//     });
// });

// router.put('/:id(\\d+)', [
//     check('CUT_ID', 'Invalid number').isNumeric(),
//     check('name', 'Length from 2 to 100').isLength({ min: 2, max: 100 }),
//     check('email', 'Invalid email').isEmail(),
//     check('address', 'Required').not().isEmpty()
// ], (req, res) => {
//     //validate data here
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json(ErrorResult(422, errors.array()));
//     }
//     Customer.findByPk(req.params.id).then(customer => {

//         if (customer != null) {
//             customer.update({
//                 name: req.body.name,
//                 commission: req.body.commission
//             }).then(customer => {
//                 return res.json(Result(customer));
//             }).catch(err => {
//                 return res.status(400).send(ErrorResult(400, err.errors));
//             });
//         } else {
//             return res.status(404).send(ErrorResult(404, 'Not Found!'));
//         }
//     });
// });

// router.delete('/:id(\\d+)', (req, res) => {
//     Customer.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(customer => {
//         return res.json(Result(customer));
//     }).catch(err => {
//         return res.status(500).send(ErrorResult(500, err.errors));
//     });
// });

// module.exports = router;