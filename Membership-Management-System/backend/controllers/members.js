const Member = require('../models/member.model.js')

const getMembers = async (req, res) => {
    try {
        const members = await Member.find()
        res.status(200).json(members)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getMember = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const member = await Member.findById(id)
        res.status(200).json(member)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getRecentMembers = async (req, res) => {
    try {
        const members = await Member.find()
            .sort({ createdAt: -1 })
            .limit(3);

        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addMember = async (req, res) => {
    try {
        const member = await Member.create(req.body)
        res.status(200).json(member)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateMember = async (req, res) => {
    try{
        const { id } =req.params;
        const member = await Member.findByIdAndUpdate(id, req.body);

        const Updatedproduct = await Member.findById(id);
        res.status(200).json(Updatedproduct)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteMember = async (req, res) => {
    try {
        const { id } = req.params
        const member = await Member.findByIdAndDelete(id)
        res.status(200).json(member)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addMember,
    getMembers,
    getMember,
    getRecentMembers,
    updateMember,
    deleteMember
}