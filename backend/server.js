<<<<<<< HEAD
const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
=======
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
>>>>>>> 4c59885d039d8866dd25bb1cd3b91ecc3862c50c
// import user from "./src/controllers/user_controller.js";

const PORT = process.env.PORT;

require('dotenv').config()

app.use(express.json())

app.use(express.urlencoded(
    { extended: false }
    ))
    
app.get('/', (req, res)=> {
        res.send('welcome')
    })
    
app.listen(PORT, ()=> console.log(`listening on port goalMates ${process.env.PORT || 5432 }`))

<<<<<<< HEAD
app.listen(PORT, () => console.log(`listening on port goalMates ${process.env.PORT || 4000}`));

// module.export = goalMates_server;
=======

    
/* / CONTROLLERS 
const userController = require('./controllers/user_controller')
const goalController = require('./controllers/goal_controller')
// const mateController = require('./controllers/mate_controller')
app.use('/user', userController)
app.use('/goal', goalController)
// app.use('/mate', mateController) */
>>>>>>> 4c59885d039d8866dd25bb1cd3b91ecc3862c50c
