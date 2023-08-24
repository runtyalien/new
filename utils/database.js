const Sequelize = require('sequelize');

const sequelize = new Sequelize('seller', 'root', 'omkar', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;