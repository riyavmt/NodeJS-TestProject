const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const libraryRouter = require('./Backend/routes/library');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(libraryRouter);




const sequelize = require('./Backend/util/database');

async function startServer(){
    try{
        await sequelize.sync({force:false});
        app.listen(3000,()=>{
            console.log("Server is running")
        })
    }
    catch(err){console.log(err)};
}

startServer();