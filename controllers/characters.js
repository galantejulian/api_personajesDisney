const path = require('path');
const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
    create: async (req, res) => {
        const { name, age, history, image, weight, title, image_movie, release_date, rating } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    ok: false,
                },
                errors: errors.mapped(),
            });
        }

        const character = await db.Characters.create({
            name,
            age,
            history,
            image,
            weight,
            Movies: [{
                title,
                image_movie,
                release_date,
                rating
            }]
        }, {
            include: ['Movies']
        }).catch(error => console.log(error))

        return res.status(200).json({
            meta: {
                status: 200,
                ok: true,
            },
            data: character,
        });
    },

    index: (req, res) => {
        res.send('hola')
    }
}


