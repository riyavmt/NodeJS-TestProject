const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));





const sequelize = require('./Backend/util/database');