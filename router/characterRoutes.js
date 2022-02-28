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

//Create
router.post("/create", charactersValidation, create);

//List
router.get('/', list);

// update
router.put('/update/:id', update);

// delete

router.delete('/delete/:id', remove);

// detail

router.get('/detail/:id', detail)

// router.get('/characters?name', search);

module.exports = router