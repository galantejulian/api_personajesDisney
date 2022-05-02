const express = require('express');
const router = express.Router();
const movieValidation = require("../validations/moviesCreate");
const verifyToken = require('../middlewares/authJWT');
const {
    list,
    detail,
    update,
    create,
    remove
    // search
} = require("../controllers/movies");


//Create
router.post('/create', verifyToken, movieValidation, create)
// All
router.get('/', verifyToken, list)
// Detail
router.get('/detail/:id', verifyToken, detail)
// Update
router.put('/update/:id', verifyToken, movieValidation, update)

router.delete('delete/:id', verifyToken, remove)

module.exports = router