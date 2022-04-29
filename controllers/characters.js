const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
module.exports = {

    // ========CREATE======
    create: async (req, res) => {
        const { name, age, history, image, weight, title, image_movie, release_date, rating, genre_id } = req.body;
        const errors = validationResult(req);

        // validations
        if (!errors.isEmpty()) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    ok: false,
                    errors: errors.mapped()
                },
            });
        }
        // character creation including movies and genre of movie
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
                rating,
                genre_id
            }]
        }, {
            include: ['Movies', "Genres"]
        }).catch(error => console.log(error))
        if (character) return res.status(200).json({ ok: true, data: character });
        else return res.status(400).json({ ok: false, error: "Error creating character" });
    },

    // ========LIST======

    list: async (req, res) => {
        const characters = await db.Characters.findAll({
            attributes: ['name', 'image']
        })
        if (characters) return res.status(200).json({ ok: true, data: characters })
        else return res.status(400).json({ ok: false, error: "Error getting characters" })
    },

    // =====UPDATE=====

    update: async (req, res) => {
        const { name, age, history, image, weight } = req.body;
        const errors = validationResult(req);
        const id = req.params.id;

        if (!errors.isEmpty()) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    ok: false,
                    errors: errors.mapped()
                },
            });
        }
        // old values
        const stateBefore = await db.Characters.findByPk(id);
        // new values
        const characterUpdated = await db.Characters.update(
            {
                //    if there is no new value it will have the old one
                name: name || stateBefore.name,
                age: age || stateBefore.age,
                history: history || stateBefore.history,
                image: image || stateBefore.image,
                weight: weight || stateBefore.weight
            }, { where: { id, } });
        if (characterUpdated) return res.status(201).json({
            ok: true,
            data: {
                characterUpdated: await db.Characters.findByPk(id), // request db for the character updated
                characterBeforeUpdate: stateBefore, // character before update
            },
        });

    },

    // =====DELETE=====

    remove: async (req, res) => {
        const id = req.params.id
        const deletedCharacter = await db.Characters.findByPk(id)
        await db.Characters.destroy({
            where: { id: req.params.id }
        })

        if (deletedCharacter) return res.status(200).json({ ok: true, data: deletedCharacter })
        else return res.status(400).json({ ok: false, message: "there is no Character matching with the chosen id", })
    },
    // =====DETAIL=====

    detail: async (req, res) => {
        const characterFound = await db.Characters.findByPk(req.params.id, {
            include: ['Movies']
        })
        if (characterFound) return res.status(200).json({ ok: true, data: characterFound })
        else return res.status(400).json({ ok: false, message: "there is no chacters matching with selected id" })
    },
    search: async (req, res) => {
        let name = req.query.name
        let age = req.query.age
        let movies = req.query.movies

        if (name) {
            const characters = await db.Characters.findOne({
                include: [
                    { association: "Movies" }
                ],
                where: { name: name }
            })
            if (characters) return res.status(200).json({ ok: true, message: `El personaje encontrado es: ${characters.name}`, data: characters })
            else return res.status(400).json("There are no characters with that name")
        }
        if (age) {
            const characters = await db.Characters.findAll({
                include: [
                    { association: "Movies" }
                ],
                where: { age: age }
            })
            if (characters) return res.status(200).json({ ok: true, message: `La edad del personaje es ${age} `, data: characters })
            else return res.status(400).json("there are no characters with that age")
        }
        if (movies) {
            try {
                const characters = await db.Movies.findOne({
                    include: [
                        { association: "Characters" }
                    ],
                    where: { id: movies }
                })
                if (characters) return res.status(200).json({ ok: true, data: characters })
            } catch (error) {
                console.log(error)
            }
        }

    }

}