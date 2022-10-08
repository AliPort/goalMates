const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const user = require('./controllers/user_controller')

const PORT = process.env.PORT

require('dotenv').config()
app.use(express.urlencoded(
    { extended: false }
    ))
    
    
    app.get('/', (req, res)=> {
        res.send('welcome')
    })
    
    app.listen(PORT, ()=> console.log(`listening on port goalMates ${PORT}`))
    
