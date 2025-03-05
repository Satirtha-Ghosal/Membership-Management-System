const mongoose = require('mongoose')

const PlanSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        validity: {
            type: Number,
            required: true
        }

    }
)

const plan = mongoose.model("Plan", PlanSchema)

module.exports = plan