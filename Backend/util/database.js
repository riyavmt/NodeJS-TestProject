const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodeproject','root','Mysqlnode147*',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;