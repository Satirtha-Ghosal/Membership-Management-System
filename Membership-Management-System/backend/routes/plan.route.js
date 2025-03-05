const express = require('express')

const planRouter = express.Router()

const { addPlan, getPlan, getPlans, deletePlan, updatePlan } =require('../controllers/plans.js')

planRouter.post('/addPlan', addPlan)
planRouter.get('/getPlans', getPlans)
planRouter.get('/getPlan/:id', getPlan)
planRouter.put('/updatePlan/:id', updatePlan)
planRouter.delete('/deletePlan/:id', deletePlan)

module.exports = planRouter