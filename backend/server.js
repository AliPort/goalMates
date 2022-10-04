const express = require('express')
const PORT = process.env.PORT
const app = express
const { Sequelize } = require('sequelize')
const user = require('./controllers/user_controller')


require('dotenv').config()
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res)=> {
    res.send('welcome')
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))