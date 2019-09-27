
const express = require('express');
const { Ingredient } = require('./../models/db');
const { PagingResult, ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});

// fill ingredients apis here
router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'M_ID';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        Ingredient.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Ingredient.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,               
            }).then(ingredients => {
                return res.json(PagingResult(ingredients, {
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
               { MA_ID: { [Op.like]: queryString } },
               { count: { [Op.like]: queryString } }
            ]
        };
        Ingredient.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Ingredient.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize
            }).then(ingredients => {
                return res.json(PagingResult(ingredients, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }
});


router.get('/:M_ID', (req, res) => {
    Ingredient.findByPk(req.params.M_ID).then(type => {
        if (type != null) {
            return res.json(Result(type));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/', (req, res) => {
    //validate data here
    Ingredient.create(req.body).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:M_ID', (req, res) => {
    //validate data here
    Ingredient.findByPk(req.params.M_ID).then(type => {
        if (type != null) {
            type.update({
                MA_ID: req.body.MA_ID,
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

router.delete('/:M_ID', (req, res) => {
    Ingredient.destroy({
        where: {
            M_ID: req.params.M_ID
        }
    }).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;