const { body } = require("express-validator");
const db = require("../models");

module.exports = [
    body("title")
        .notEmpty()
        .withMessage('Name cannot be empty')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must have more than 2 characters')
        .bail()
    ,

    body("image_movie")
        .default("https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg")
        .isString()
        .withMessage('Image" must be a text string')
        .bail(),

    body("rating")
        .isNumeric()
        .withMessage('Rating must be a number'),
];