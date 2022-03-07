const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const characterRoutes = require("./router/characterRoutes")
const movieRoutes = require("./router/movieRoutes")
const authRoutes = require('./router/authRoutes')
require('dotenv').config()


// routers
// const indexRouter = require('./routes/index');


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// routes
app.use('/characters', characterRoutes)
app.use('/movies', movieRoutes)
app.use('/auth', authRoutes)

app.listen('3333', () => console.log('Servidor corriendo en el puerto 3'));

module.exports = app;
