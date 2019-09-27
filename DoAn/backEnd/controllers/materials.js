const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op;
const { MaterialType, Material } = require('./../models/db');
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
    let sortColumn = 'name';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
 
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        Material.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Material.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,                
                include: [{ model: MaterialType,  as: 'materialType' }]
            }).then(materials => {
                return res.json(PagingResult(materials, {
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
               { name: { [Op.like]: queryString } }
            ]
        };

        Material.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Material.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,
                include: [{ model: MaterialType,  as: 'materialType' }]
            }).then(materials => {
                return res.json(PagingResult(materials, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }
});
router.get('/getByMaterialType/:id(\\d+)', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'name';
    let sortDirection = 'ASC'
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];

    }
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        const whereClause = { MA_T_ID: req.params.id };
        Material.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Material.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: MaterialType, as: 'materialType' }]
            }).then(materials => {
                return res.json(PagingResult(materials, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }));
            });
        });
    } else {
        const whereClause = {
            MA_T_ID: req.params.id,
            [Op.or]: [
                { name: { [Op.like]: queryString } }
            ]
        };
        Material.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Material.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model:MaterialType, as: 'materialType' }]
            }).then(materials => {
                return res.json(PagingResult(materials, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalPage: totalRows,
                    totalPages: totalPages
                }));
            });

        });
    }
});
router.get('/:id(\\d+)', (req, res) => {
    Material.findOne({ 
        where: {id: req.params.id }, 
        include: [{ model: MaterialType,  as: 'materialType' }]
    }).then(material => {
        if (material != null) {
            return res.json(Result(material));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/',[
    check('MA_T_ID','Invalid number').isNumeric(),
    check('name','Length from 2 to 100').isLength({min: 2, max: 100}),
    check('supplie', 'Required').not().isEmpty(),
    check('unit', 'Required').not().isEmpty(),
    check('count', 'Required').not().isEmpty(),
    check('cost', 'Required').not().isEmpty(),
    check('expirationDate','Required').not().isEmpty(),
    check('importDate', 'Required').not().isEmpty(),
], (req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
    Material.create(req.body).then(material => {
        return res.json(Result(material));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)',[
    check('MA_T_ID','Invalid number').isNumeric(),
    
    check('name','Length from 2 to 100').isLength({min: 2, max: 100}),
    check('supplie', 'Required').not().isEmpty(),
    check('unit', 'Required').not().isEmpty(),
    check('count', 'Required').not().isEmpty(),
    check('cost','Required').not().isEmpty(),
    check('expirationDate','Required').not().isEmpty(),
    check('importDate', 'Required').not().isEmpty(),
    ],(req, res) => {
        //validate data here
        if (!errors.isEmpty()) {
        const errors = validationResult(req);
            return res.status(422).json(ErrorResult(422, errors.array()));
        }
    Material.findByPk(req.params.id).then(material => {
        if (material != null) {
            material.update({
                name: req.body.name,
                supplie: req.body.supplie,
                unit:req.body.unit,
                count: req.body.count,
                cost: req.body.cost,
                expirationDate: req.body.expirationDate,
                importDate: req.body.importDate
            }).then(material => {
                return res.json(Result(material));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            return res.status(404).send(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.delete('/:id(\\d+)', (req, res) => {
    Material.destroy({
        where: {
            id: req.params.id
        }
    }).then(material => {
        return res.json(Result(material));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;