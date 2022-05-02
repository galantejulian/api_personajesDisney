'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Genres extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Genres.associate = (models) => {
                Genres.hasMany(models.Movies, {
                    as: "Movies",
                    foreignKey: "genre_id",
                });
            };
        }
    };
    Genres.init({
        genre_id: DataTypes.INTEGER,
        name_genre: DataTypes.STRING,
        image_genre: DataTypes.STRING,
        rating: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Genres',
        timestamps: false
    });
    return Genres;
};