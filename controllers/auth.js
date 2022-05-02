const db = require("../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { transport } = require("../services/email");
const { createJWT } = require("../helpers/createJWT");

module.exports = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(409).json({
                    ok: false,
                    errors: errors.mapped(),
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const respHash = await bcrypt.hash(password, salt);
                const newUser = await db.Users.create({
                    name,
                    email,
                    password: respHash,
                })
                await transport.sendMail({
                    from: "<api_disney@gmail.com>",
                    to: email,
                    subject: "Successful registration",
                    html: `
                    <div>
                      <h1>Thanks for your registration</h1>
                    </div>
                    `,
                });
                res.status(200).json({
                    ok: true,
                    data: newUser,
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                data: error,
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await db.Users.findOne({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    msg: `email ${email} does not blong to any registered user`,
                });
            }

            // Verify Password
            const validPass = bcrypt.compareSync(password, user.password);
            if (!validPass) {
                return res.status(400).json({
                    ok: false,
                    msg: "The passsword is wrong",
                });
            }

            //Create JWT
            const token = await createJWT(user.email);

            res.status(200).json({
                ok: true,
                msg: "User logged in",
                token,
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                data: error,
            })
        }
    }
}