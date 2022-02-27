
'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Characters_movies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Characters_movies.belongsTo(models.Characters, {
                as: "Characters",
                foreignKey: "character_id",
            })
            Characters_movies.belongsTo(models.Movies, {
                as: "Movies",
                foreignKey: "movie_id",
            })
        }
    };
    Characters_movies.init({
        movie_id: DataTypes.STRING,
        character_id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Characters_movies',
        timestamps: false
    });
    return Characters_movies;
};