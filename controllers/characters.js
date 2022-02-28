const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
module.exports = {

    // ========CREATE======
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
    // ========LIST======

    list: async (req, res) => {
        const characters = await db.Characters.findAll({
            attributes: ['name', 'image']
        })
        if (characters) {
            return res.status(200).json({
                meta: {
                    status: 200,
                    ok: true,
                },
                data: characters,
            });
        } else {
            res.status(400).json(
                { message: "error" })
        }
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
                },
                errors: errors.mapped(),
            });
        }
        const stateBefore = await db.Characters.findByPk(id); // Obtenemos el personaje antes de ser eliminado para enviarlo como información

        await db.Characters.update(
            // Actializamos los datos
            {
                // Si no se cambia o se omite esta información recibe el valor que tenia antes
                name: name || stateBefore.name,
                age: age || stateBefore.age,
                history: history || stateBefore.history,
                image: image || stateBefore.image,
                weight: weight || stateBefore.weight
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
                characterUpdated: await db.Characters.findByPk(id), // Obtenemos el personaje actualizado y lo enviamos
                characterBeforeUpdate: stateBefore, // Enviamos el personaje en el estado anterior
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

        if (deletedCharacter) {
            return res.status(200).json(deletedCharacter)
        } else {
            return res.status(400).json({
                message: "there is no Character matching with the chosen id",
            })
        }
    },
    // =====DETAIL=====

    detail: async (req, res) => {
        try {
            const characterFound = await db.Characters.findByPk(req.params.id, {
                include: [{
                    association: "Movies",
                    attributes: ['title'],
                }]
            })
            if (characterFound) {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        ok: true,
                    },
                    data: characterFound,
                });
            } else {
                return res.status(400).json({
                    meta: {
                        status: 400,
                        ok: false
                    },
                    message: "there is no chacters matching with selected id"
                })
            }
        } catch (error) {
            console.log(error)
        }

    },
    // search: async (req, res) => {
    //     const { name, age, movies } = req.query;
    //     console.log(req.query)

    //     if (name) {
    //         const character = await db.Characters.findAll({
    //             where: {
    //                 name: {
    //                     [Op.like]: `%{name}%`
    //                 }
    //             }
    //         })

    //     }
    //     if (age) {
    //         const character = await db.Characters.findAll({
    //             where: {
    //                 edad: {
    //                     [Op.like]: "%" + edad + "%"
    //                 }
    //             }
    //         })
    //     }

    //     if (movies) {
    //         const character = await db.Characters.findAll({
    //             include: ['Movies'],
    //             where:
    //             {
    //                 [Op.like]: "%" + movies + "%"
    //             }

    //         })
    //     }
    //     if (!personaje.length) {
    //         res.status(404).json({
    //             message: "error, personaje no encotrada"
    //         })
    //     } else {
    //         res.status(200).json({
    //             message: 'personaje encontrado',
    //             data: character
    //         })
    //     }
    // }
}

