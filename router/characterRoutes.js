const router = require("express").Router();
const {
    create,
    list,
    update,
    remove,
    detail,
    // search
} = require("../controllers/characters");
const charactersValidation = require("../validations/charactersCreate");
const verifyToken = require("../middlewares/authJWT")
//Create
router.post("/create", charactersValidation, verifyToken, create);

//List
router.get('/', verifyToken, list);

// update
router.put('/update/:id', verifyToken, update);

// delete

router.delete('/delete/:id', verifyToken, remove);

// detail

router.get('/detail/:id', verifyToken, detail)

// router.get('/characters?name', search);

module.exports = router