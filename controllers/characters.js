const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
module.exports = {

    // ========CREATE======
    create: async (req, res) => {
        try {
            const { name, age, history, image, weight, title, image_movie, release_date, rating, genre_id } = req.body;
            const errors = validationResult(req);

            // validations
            if (!errors.isEmpty()) {
                return res.status(404).json({
                    ok: false,
                    errors: errors.mapped()
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
                include: ['Movies']
            }).catch(error => console.log(error))
            if (character) return res.status(200).json({ ok: true, data: character });
            // else return res.status(400).json({ ok: false, error: "Error creating character" });
        } catch (error) {
            res.status(500).json({ ok: false, data: error });
        }

    },

    // ========LIST======

    list: async (req, res) => {
        try {
            const characters = await db.Characters.findAll({
                attributes: ['name', 'image']
            })
            if (characters) return res.status(200).json({ ok: true, data: characters })
            else return res.status(400).json({ ok: false, error: "Error getting characters" })
        } catch (error) {
            res.status(404).json({ ok: false, data: error });
        }
    },

    // =====UPDATE=====

    update: async (req, res) => {
        try {
            const { name, age, history, image, weight } = req.body;
            const errors = validationResult(req);
            const id = req.params.id;

            if (!errors.isEmpty()) {
                return res.status(404).json({
                    ok: false,
                    errors: errors.mapped()
                });
            }
            let characterToUpdate = await db.Characters.findByPk(id);
            if (characterToUpdate) {
                const characterUpdated = await db.Characters.update(
                    { name, age, history, image, weight }, { where: { id, } });
                if (characterUpdated) return res.status(201).json({
                    ok: true,
                    data: await db.Characters.findByPk(id)
                });
            } else {
                return res.status(404).json({
                    ok: false,
                    msg: "there is no character matching with the choosen id"
                });
            }

        } catch (error) {
            res.status(500).json({ ok: false, data: error });
        }
    },

    // =====DELETE=====

    remove: async (req, res) => {
        try {
            const id = req.params.id
            const deletedCharacter = await db.Characters.findByPk(id)
            await db.Characters.destroy({
                where: { id: req.params.id }
            })

            if (deletedCharacter) return res.status(200).json({ ok: true, data: deletedCharacter })
            else return res.status(400).json({ ok: false, message: "there is no Character matching with the chosen id", })
        } catch (error) {
            res.status(404).json({ ok: false, data: error });
        }
    },
    // =====DETAIL=====

    detail: async (req, res) => {
        try {
            const characterFound = await db.Characters.findByPk(req.params.id, {
                include: ['Movies']
            })
            if (characterFound) return res.status(200).json({ ok: true, data: characterFound })
            else return res.status(400).json({ ok: false, msg: "No matching Id" })
        } catch (error) {
            res.status(500).json({ ok: false, data: error });
        }
    },
    search: async (req, res) => {
        try {
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
                const characters = await db.Characters.findOne({
                    include: [
                        { association: "Movies" }
                    ],
                    where: { age: age }
                })
                if (characters) return res.status(200).json({ ok: true, message: `La edad del personaje es ${age} `, data: characters })
                else return res.status(400).json("there are no characters with that age")
            }
            if (movies) {
                const characters = await db.Movies.findOne({
                    include: [
                        { association: "Characters" }
                    ],
                    where: { id: movies }
                })
                if (characters) return res.status(200).json({ ok: true, data: characters })
                else return res.status(400).json("there are no movies with that id")
            }

            const allCharacter = await db.Characters.findAll({
                attributes: ["image", "name"],

            });

            if (allCharacter.length > 0) return res.status(200).json(allCharacter);
            else return res.status(400).json(errorInvalid)

        } catch (error) {
            res.status(500).json({ ok: false, data: error });
        }
    }
}