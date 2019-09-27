
const express = require('express');
const { CancelMaterial } = require('./../models/db');
const { PagingResult, ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});

// fill cancelMaterials apis here
router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'MT_ID';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        CancelMaterial.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            CancelMaterial.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,               
            }).then(cancelMaterials => {
                return res.json(PagingResult(cancelMaterials, {
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
               { E_ID: { [Op.like]: queryString } },
               { date: { [Op.like]: queryString} },
               { reason: { [Op.like]: queryString} },
               { count: { [Op.like]: queryString} }
            ]
        };
        CancelMaterial.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            CancelMaterial.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize
            }).then(cancelMaterials => {
                return res.json(PagingResult(cancelMaterials, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }
});


router.get('/:MT_ID', (req, res) => {
    CancelMaterial.findByPk(req.params.MT_ID).then(type => {
        if (type != null) {
            return res.json(Result(type));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/', (req, res) => {
    //validate data here
    CancelMaterial.create(req.body).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:MT_ID', (req, res) => {
    //validate data here
    CancelMaterial.findByPk(req.params.MT_ID).then(type => {
        if (type != null) {
            type.update({
                E_ID: req.body.E_ID,
                date: req.body.date,
                reason: req.body.reason,
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

router.delete('/:MT_ID', (req, res) => {
    CancelMaterial.destroy({
        where: {
            MT_ID: req.params.MT_ID
        }
    }).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;