const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Library = sequelize.define('books',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    book_name:Sequelize.STRING,
    issue_date: Sequelize.STRING,
    return_date: Sequelize.STRING,
    fine: Sequelize.STRING,
    returned_book:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    returned_date:{
        type:Sequelize.STRING,
        defaultValue:'',
    }


})

module.exports = Library;