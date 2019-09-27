
const express = require('express');
const { MenuType } = require('./../models/db');
const { ErrorResult, Result } = require('./../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    // authorize here
    next();
});
//fill tableDetails apis here
router.get('/', (req, res) => {
    MenuType.findAll().then(type => {
        return res.json(Result(type))
    });
});

//getting a specific tableDetails type
router.get('/:id(\\d+)', (req, res) => {
    MenuType.findByPk(req.params.id).then(type => {
        if (type != null) {
            return res.json(Result(type));
        } else {
            return res.status(404).json(ErrorResult(404, 'Not Found!'));
        }
    });
});

//creating a new tableDetails type
router.post('/', (req, res) => {
    //validate data
    MenuType.create(req.body).then(type => {
        return res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

//updating an existed tableDetails type
// router.put('/:id(\\d+)', (req, res) => {
//     // validate data
//     MenuType.findByPk(req.params.id).then(type => {
//         if (type != null) {
//             type.update({
//                 name: req.params.name

//             }).then(type => {
//                 return res.json(Result(type));
//             }).catch(err => {
//                 return res.status(400).send(ErrorResult(400, err.errors));
//             });
//         } else {
//             return res.status(404).send(ErrorResult(404, 'Not Found!'));
//         }
//     });
// });

// router.delete('/:id(\\d+)', (req, res) => {
//     MenuType.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(type => {
//         return res.json(Result(type));
//     }).catch(err => {
//         return res.status(500).send(ErrorResult(500, err.errors));
//     });
// });

module.exports = router;

