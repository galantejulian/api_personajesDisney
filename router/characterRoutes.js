const router = require("express").Router();
const {
    create,
    list,
    update,
    remove,
    detail,
    search
} = require("../controllers/characters");
const charactersValidation = require("../validations/charactersCreate");
const verifyToken = require("../middlewares/authJWT")

//Create
router.post("/create", charactersValidation, verifyToken, create);

//List
router.get('/', verifyToken, list);

// Search
router.get('/', verifyToken, search);

// Update
router.put('/update/:id', verifyToken, update);

// Delete

router.delete('/delete/:id', verifyToken, remove);

// Detail

router.get('/detail/:id', verifyToken, detail)


module.exports = router