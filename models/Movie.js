'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Movies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Movies.associate = (models) => {
                Movies.belongsTo(models.Genres, {
                    as: "Genres",
                    foreignKey: "genre_id",
                });
                Movies.belongsToMany(models.Character, {
                    as: "Characters",
                    through: "Characters_movies",
                    foreignKey: "movie_id",
                    otherKey: "character_id",
                    timestamps: false,
                });
            };
        }
    };
    Movies.init({
        image_movie: DataTypes.STRING,
        title: DataTypes.STRING,
        release_date: DataTypes.INTEGER,
        history: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Movies',
        timestamps: false
    });
    return Movies;
};
