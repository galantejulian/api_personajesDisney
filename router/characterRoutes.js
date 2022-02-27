const router = require("express").Router();
const {
    create,
    index
} = require("../controllers/characters");
const characterCreate = require("../validations/charactersCreate");

// characterCreate
router.post("/create", characterCreate, create);
router.get('/', index)

module.exports = router