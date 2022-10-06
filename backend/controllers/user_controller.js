// DEPENDENCIES
const user = require('express').Router()
const db = require('../models')
const { User } = db 
const { Op } = require('sequelize')

// FIND ALL USERS
user.get('/', async (req, res) => {
    try {
        const foundUsers = await User.findAll({
           
            order: [ [ 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
           
        })
        res.status(200).json(foundUsers)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC USER
user.get('/:name', async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where: { name: req.params.name },
            include: [ 
                { 
                model: User, 
                }],
                order: [
                    DESC
                ]
            
            })
        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json(error)
    }
})
// CREATE A USER
user.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new user',
            data: newUser
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
// UPDATE A USER
user.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: {
                user_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedUser} User(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A USER
user.delete('/:id', async (req, res) => {
    try {
        const deletedUsers = await User.destroy({
            where: {
                user_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedUsers} user(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = user