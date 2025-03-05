const Plan = require('../models/plan.model.js')

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find()
        res.status(200).json(plans)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getPlan = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const plan = await Plan.findById(id)
        res.status(200).json(plan)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addPlan = async (req, res) => {
    try {
        const plan = await Plan.create(req.body)
        res.status(200).json(plan)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updatePlan = async (req, res) => {
    try{
        const { id } =req.params;
        const plan = await Plan.findByIdAndUpdate(id, req.body);

        const Updatedproduct = await Plan.findById(id);
        res.status(200).json(Updatedproduct)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deletePlan = async (req, res) => {
    try {
        const { id } = req.params
        const plan = await Plan.findByIdAndDelete(id)
        res.status(200).json(plan)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getPlans,
    getPlan,
    addPlan,
    updatePlan,
    deletePlan
}