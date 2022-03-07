const { body } = require("express-validator");
const db = require("../models");

module.exports = [
    body("email")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .bail()
        .isEmail()
        .withMessage("Email invalid").bail()
        .custom(async (value) => {
            const email = await db.Users.findOne({ where: { email: value } });
            return email && Promise.reject("Email already exists");
        }),
    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .bail()
        .isString()
        .withMessage("Password must be a text string")
        .isLength({ min: 4 })
        .withMessage("Password must be less than 4 characters"),
];