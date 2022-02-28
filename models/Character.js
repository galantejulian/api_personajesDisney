'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Characters extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Characters.belongsToMany(models.Movies, {
                onDelete: 'cascade',
                hooks: "true",
                as: "Movies",
                through: "Characters_movies",
                foreignKey: "character_id",
                otherKey: "movie_id",
                timestamps: false,
            });
        }
    };
    Characters.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        age: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        history: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Characters',
        timestamps: false
    });

    return Characters;
};
