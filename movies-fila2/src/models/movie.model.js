import {DataTypes} from 'sequelize';
import sequelize from '../config/database.js';

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
        },
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

});
export default Movie;