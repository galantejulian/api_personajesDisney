const { body } = require("express-validator");
const db = require("../models");

module.exports = [
    body("name")
        .notEmpty()
        .withMessage('Name cannot be empty')
        .bail()
        .isLength({ min: 3 })
        .withMessage('"Name" must have more than 2 characters')
        .bail()
    ,

    body("age")
        .isNumeric()
        .withMessage('Age must be numeric'),

    body("history")
        .isString()
        .withMessage('History must be a text string'),

    body("image")
        .default("https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg")
        .isString()
        .withMessage('Image" must be a text string')
        .bail(),

    body("weight")
        .isNumeric()
        .withMessage('Weight" must be a number'),
];