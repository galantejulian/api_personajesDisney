const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
module.exports = {

    // ====All movies===

    list: async (req, res) => {
        try {
            let name = req.query.name
            let genre = req.query.genre
            let order = req.query.order

            if (genre) {
                const moviesByGenres = await db.Movies.findAll({
                    include: [
                        { association: "Characters" }
                    ],
                    where: { genre_id: genre }
                })
                if (moviesByGenres) return res.status(200).json({ ok: true, data: moviesByGenres })
                else return res.status(404).json({ ok: false, error: "Genre not found" })
            }
            if (name) {
                const movie = await db.Movies.findOne({
                    include: [
                        { association: "Characters" }
                    ],
                    where: { title: name }
                })
                if (movie) return res.status(200).json({ ok: true, data: movie })
                else return res.status(404).json("there are no movies with that name")
            }

            if (order) {
                data = await db.Movies.findAll({
                    order: [["title", order.toUpperCase()]],
                    include: ["Characters"],
                });
                if (data) return res.status(200).json({ ok: true, data: data })
            }

            const allMovies = await db.Movies.findAll();
            if (allMovies) return res.status(200).json({ ok: true, data: allMovies })


        } catch (error) {
            res.status(404).json({ ok: false, error: error });
        }

    },

    // =====DETAIL=====

    detail: async (req, res) => {
        try {
            const movieFound = await db.Movies.findByPk(req.params.id, {
                include: ['Characters']
            })
            if (movieFound) return res.status(200).json({ ok: true, data: movieFound });
            else return res.status(400).json({ ok: false, msg: "No matching Id" });
        } catch (error) {
            res.status(404).json({ ok: false, data: error });
        }

    },
    // =====UPDATE=====
    update: async (req, res) => {
        try {
            const { image_movie, title, release_date, rating } = req.body;
            const errors = validationResult(req);
            const id = req.params.id;

            if (!errors.isEmpty()) {
                return res.status(404).json({
                    status: 404,
                    ok: false,
                    errors: errors.mapped()
                });
            }

            const movieUpdated = await db.Movies.update({
                title,
                release_date,
                rating,
                image_movie,
            }, { where: { id } });

            if (movieUpdated) return res.status(201).json({
                ok: true, data: {
                    characterUpdated: await db.Movies.findByPk(id),
                }
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ ok: false, data: error });
        }

    },
    // ========CREATE======
    create: async (req, res) => {
        try {
            const { name, age, history, image, weight, title, image_movie, release_date, rating, genre_id } = req.body;

            const movie = await db.Movies.create({
                title,
                image_movie,
                release_date,
                rating,
                genre_id,
                Characters: [{
                    name,
                    age,
                    history,
                    image,
                    weight,
                }]
            }, {
                include: ['Characters', 'Genres']
            })
            if (movie) return res.status(201).json({ ok: true, data: movie });
            else return res.status(400).json({ ok: false, error: "Error creating movie" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ ok: false, data: error });
        }
    },

    // =====DELETE=====

    remove: async (req, res) => {
        try {
            const id = req.params.id
            const deletedMovie = await db.Movies.findByPk(id)
            await db.Movies.destroy({
                where: { id: req.params.id }
            })

            if (deletedMovie) return res.status(200).json({ ok: true, data: deletedMovie, messege: "deleted movie succesfully" })
            else return res.status(400).json({ ok: false, message: "there is no Movie matching with the chosen id" })

        } catch (error) {
            res.status(500).json({ ok: false, data: error });
        }

    }
}