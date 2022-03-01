const router = require("express").Router();
const {
    list,
    detail,
    update,
    create,
    remove
    // search
} = require("../controllers/movies");
const charactersValidation = require("../validations/charactersCreate");
router.get('/', list)
router.get('/detail/:id', detail)
router.put('/update/:id', update)
router.post('/create', create)
router.delete('/:id', remove)

module.exports = router