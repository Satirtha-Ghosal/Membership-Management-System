const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        dob: {
            type: Date,
            required: true
        },

        gender: {
            type: String,
            required: true
        },

        contactNumber: {
            type: Number,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true
        },

        pincode: {
            type: Number,
            required: true
        },

        membershipType: {
            type: String,
            required: true
        },

        memberPhoto: {
            type: String,
            required: true
        },

        expiryDate: {
            type: Date,
            required: true
        }

    },
    {
        timestamps: true
    }
)

const Member = mongoose.model("Member", MemberSchema)

module.exports = Member