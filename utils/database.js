const Sequelize = require('sequelize');

const sequelize = new Sequelize('userexpense', 'root', 'omkar', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;