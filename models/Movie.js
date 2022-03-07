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
            // define association here
            Movies.belongsToMany(models.Characters, {
                onDelete: 'cascade',
                hooks: "true",
                as: "Characters",
                through: "Characters_movies",
                foreignKey: "movie_id",
                otherKey: "character_id",
                timestamps: false,
            });
            Movies.belongsTo(models.Genres, {
                as: "Genres",
                foreignKey: "genre_id"
            })
        }
    };
    Movies.init({
        image_movie: DataTypes.STRING,
        title: DataTypes.STRING,
        release_date: DataTypes.INTEGER,
        rating: DataTypes.STRING,
        genre_id: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        sequelize,
        modelName: 'Movies',
        timestamps: false,
    });
    return Movies;
};
