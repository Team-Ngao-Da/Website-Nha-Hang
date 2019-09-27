const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op;
const { MenuType, Menu } = require('./../models/db');
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

        Menu.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Menu.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: MenuType, as: 'menuType' }]
            }).then(menus => {
                return res.json(PagingResult(menus, {
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

        Menu.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Menu.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: pageSize,
                include: [{ model: MenuType, as: 'menuType' }]
            }).then(menu => {
                return res.json(PagingResult(menu, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            });
        });
    }
});
router.get('/getByMenuType/:id(\\d+)', (req, res) => {
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
        const whereClause = { MT_ID: req.params.id };

        Menu.count({where: whereClause}).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Menu.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,                
                include: [{ model: MenuType,  as: 'menuType' }]
            }).then(menus => {
                return res.json(PagingResult(menus, {
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
            MT_ID: req.params.id,
            [Op.or]: [
                { name: { [Op.like]: queryString } }
            ]
        };

        Menu.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Menu.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,
                include: [{ model: MenuType,  as: 'menuType' }]
            }).then(menus => {
                return res.json(PagingResult(menus,{
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
    Menu.findOne({
        where: { id: req.params.id },
        include: [{ model: MenuType, as: 'menuType' }]
    }).then(menu => {
        if (menu != null) {
            return res.json(Result(menu));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.post('/',[
    check('MT_ID', 'Invalid number').isNumeric(),
    check('name', 'Length from 2 to 100').isLength({min: 2, max: 100}),
    check('price','Required').not().isEmpty(),
    check('image','Required').not().isEmpty()
] ,(req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    }
    Menu.create(req.body).then(menu => {
        return res.json(Result(menu));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)',[
    check('MT_ID', 'Invalid number').isNumeric(),
    check('name', 'Length from 2 to 100').isLength({min: 2, max: 100}),
    check('price','Required').not().isEmpty(),
    check('image','Required').not().isEmpty()
],(req, res) => {
    //validate data here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(ErrorResult(422, errors.array()));
    } 
    Menu.findByPk(req.params.id).then(customer => {
        if (menu != null) {
            menu.update({
                name: req.body.name,
                price: req.body.price,
                image: req.body.image

            }).then(customer => {
                return res.json(Result(customer));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            return res.status(404).send(ErrorResult(404, 'Not Found!'));
        }
    });
});

router.delete('/:id(\\d+)', (req, res) => {
    Menu.destroy({
        where: {
            where: req.params.id
        }
    }).then(customer => {
        return res.json(Result(customer));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

module.exports = router;