const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { Characters } = require('../models/Character')

module.exports = {

    // ====All movies===

    list: async (req, res) => {
        try {
            const movies = await db.Movies.findAll({
                attributes: ['title', 'image_movie', 'release_date']
            })
            if (movies) {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        ok: true,
                    },
                    data: movies,
                });
            }
        } catch (error) {
            res.status(400).json({
                meta: {
                    status: 400,
                    ok: false
                },
                data: error
            })
        }

    },

    // =====DETAIL=====

    detail: async (req, res) => {
        try {
            const movieFound = await db.Movies.findByPk(req.params.id, {
                include: ["Characters"]
            })
            if (movieFound) {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        ok: true,
                    },
                    data: movieFound,
                });
            } else {
                return res.status(400).json({
                    meta: {
                        status: 400,
                        ok: false
                    },
                    message: "there is no movie matching with selected id"
                })
            }
        } catch (error) {
            console.log(error)
        }

    },
    // =====UPDATE=====
    update: async (req, res) => {
        const { image_movie, title, release_date, rating } = req.body;
        // const errors = validationResult(req);
        const id = req.params.id;

        // if (!errors.isEmpty()) {
        //     return res.status(404).json({
        //         meta: {
        //             status: 404,
        //             ok: false,
        //         },
        //         errors: errors.mapped(),
        //     });
        // }
        const stateBefore = await db.Movies.findByPk(id); // Obtenemos el personaje antes de ser eliminado para enviarlo como información

        await db.Movies.update(
            // Actializamos los datos
            {
                // Si no se cambia o se omite esta información recibe el valor que tenia antes
                title: title || stateBefore.title,
                release_date: release_date || stateBefore.release_date,
                rating: rating || stateBefore.rating,
                image_movie: image_movie || stateBefore.image_movie,
            },
            {
                where: {
                    id,
                },
            }
        );

        return res.status(201).json({
            // Si esta todo ok! se envia la respuesta satifactoria con la información indicada abajo
            meta: {
                status: 201,
                ok: true,
            },
            data: {
                characterUpdated: await db.Movies.findByPk(id), // Obtenemos el personaje actualizado y lo enviamos
                characterBeforeUpdate: stateBefore, // Enviamos el personaje en el estado anterior
            },
        });
    },
    // ========CREATE======
    create: async (req, res) => {
        try {
            const { name, age, history, image, weight, title, image_movie, release_date, rating, name_genre } = req.body;

            const movie = await db.Movies.create({
                title,
                image_movie,
                release_date,
                rating,
                Genres: [{
                    name_genre,
                }],
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
            res.status(200).json({
                meta: {
                    status: 200,
                    ok: true,
                },
                data: movie,
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({
                messege: error,
                data: error
            })
        }


    },

    // =====DELETE=====

    remove: async (req, res) => {
        const id = req.params.id
        const deletedMovie = await db.Movies.findByPk(id)
        await db.Movies.destroy({
            where: { id: req.params.id }
        })

        if (deletedMovie) {
            return res.status(200).json({
                data: deletedMovie,
                messege: "deleted movie succesfully"
            })
        } else {
            return res.status(400).json({
                message: "there is no Movie matching with the chosen id",
            })
        }
    }


}