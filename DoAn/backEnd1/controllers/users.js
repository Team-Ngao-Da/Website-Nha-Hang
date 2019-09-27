
const express = require('express');
const jwt = require('jsonwebtoken');
const helper = require('../utils/helper');
const { User } = require('./../models/db');
const { PagingResult, ErrorResult, Result } = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});

// fill user apis here
router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    let sortColumn = 'userName';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }
    const offset = page * pageSize;
    if (queryString.length <= 2) {
        User.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            User.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize,               
            }).then(users => {
                return res.json(PagingResult(users, {
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
               { name: { [Op.like]: queryString } },
               { position: { [Op.like]: queryString } }
              
            ]
        };
        user.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            User.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset, 
                limit: pageSize
            }).then(users => {
                return res.json(PagingResult(users, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            }); 
        });
    }
});

router.post('/', (req, res) => {
    //validate data here
    req.body.password = helper.hash(req.body.password); 
    User.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.post('/login', (req, res) => {
    User.findOne({ 
        where: {
            userName: req.body.userName,
            password: helper.hash(req.body.password)
        }
    }).then(aUser => {
        if (aUser != null) {
            const token = jwt.sign({userId: aUser.id, userName: aUser.userName}, 
                                    helper.appKey,
                                    {expiresIn: '1h'});

            return res.json(Result({
                id: aUser.id,
                userName: aUser.userName,
                fullName: aUser.fullName,
                token: token
            }));
        } else {
            return res.json(ErrorResult(401, 'Invalid username or password'));
        }
    });
});


router.delete('/:id(\\d+)', (req, res) => {
    User.destroy({
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