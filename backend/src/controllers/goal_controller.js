// DEPENDENCIES
const goal = require('express').Router()
const db = require('../models')
const { Goal } = db 
const { Op } = require('sequelize')


// FIND ALL GOALS
goal.get('/', async (req, res) => {
    try {
        const foundGoals = await Goal.findAll({
           
            order: [ [ 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
           
        })
        res.status(200).json(foundGoals)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC GOAL
goal.get('/:name', async (req, res) => {
    try {
        const foundGoal = await Goal.findOne({
            where: { name: req.params.name },
            include: [ 
                { 
                model: Goal
                }],
                order: [
                    DESC
                ]
            
            })
        res.status(200).json(foundGoal)
    } catch (error) {
        res.status(500).json(error)
    }
}) 

// CREATE A GOAL
goal.post('/', async (req, res) => {
    try {
        const newGoal = await Goal.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new goal',
            data: newGoal
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A GOAL
goal.put('/:id', async (req, res) => {
    try {
        const updatedGoal = await Goal.update(req.body, {
            where: {
                goal_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedGoal} Goal(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A GOAL
goal.delete('/:id', async (req, res) => {
    try {
        const deletedGoals = await Goal.destroy({
            where: {
                goal_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedGoals} goal(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = goal