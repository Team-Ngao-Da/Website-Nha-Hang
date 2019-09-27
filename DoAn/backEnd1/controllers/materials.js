
const express = require('express');
const { check, validationResult } = require('express-validator');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { MaterialType, Material } = require('./../models/db');
const {Result, PagingResult, ErrorResult} = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});

// fill material apis here
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
            }).then(material => {
                return res.json(PagingResult(material, {
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
    //
               { name: { [Op.like]: queryString } },
               { supplie: { [Op.like]: queryString } },
               { unit: { [Op.like]: queryString } },
               { count: { [Op.like]: queryString } },
               { cost: { [Op.like]: queryString } },
               { expirationDate: { [Op.like]: queryString } },
               { importDate: { [Op.like]: queryString } }
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
            }).then(material => {
                return res.json(PagingResult(material, {
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

router.post('/', (req, res) => {
    //validate data here
    Material.create(req.body).then(material => {
        return res.json(Result(material));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)',[
//
    check('name', 'Length from 2 to 100').isLength({min: 2, max: 100}),
    check('supplie', 'Length from 2 to 100').isLength({min: 2, max: 100}),
    check('count', 'Invalid number').isNumeric(),
    check('cost', 'Invalid number').isNumeric()
    ], (req, res) => {
        //validate data here
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(ErrorResult(422, errors.array()));
        }
        MaterialType.findByPk(req.params.id).then(type => {
            if (type != null) {
                type.update({
    //
                    name: req.body.name,
                    supplie: req.body.supplie,
                    unit: req.body.unit,
                    count: req.body.count,
                    count: req.body.count,
                    expirationDate: req.body.expirationDate,
                    importDate: req.body.importDate
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