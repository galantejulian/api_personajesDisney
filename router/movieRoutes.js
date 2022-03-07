const router = require("express").Router();
const {
    list,
    detail,
    update,
    create,
    remove
    // search
} = require("../controllers/movies");
const verifyToken = require("../middlewares/authJWT")
const charactersValidation = require("../validations/charactersCreate");
router.get('/', verifyToken, list)
router.get('/detail/:id', verifyToken, detail)
router.put('/update/:id', verifyToken, update)
router.post('/create', verifyToken, create)
router.delete('/:id', verifyToken, remove)

module.exports = router