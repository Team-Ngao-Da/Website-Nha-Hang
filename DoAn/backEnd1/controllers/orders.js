
const express = require('express');
const { Order } = require('./../models/db');
const { PagingResult, ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});

// fill orders apis here
router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'TD_ID';
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
            const totalPages = Math.ceil(totalRows/pageSize);
            Order.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,               
            }).then(orders => {
                return res.json(PagingResult(orders, {
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
//
               { M_ID: { [Op.like]: queryString } },
               { TD_ID: { [Op.like]: queryString } },
               { count: { [Op.like]: queryString} }
            ]
        };
        Order.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Order.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize
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


router.get('/:id', (req, res) => {
    Order.findByPk(req.params.id).then(type => {
        if (type != null) {
            return res.json(Result(type));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/:id', (req, res) => {
    //validate data here
    Order.create(req.body).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id', (req, res) => {
    //validate data here
    Order.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                id: req.body.id,
                M_ID: req.body.M_ID,
                TD_ID: req.body.TD_ID,
                count: req.body.count
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
    Order.destroy({
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