const express = require('express')
const memberRouter = express.Router()

const { addMember, getMembers, getMember, getRecentMembers, deleteMember, updateMember } = require('../controllers/members.js')

memberRouter.get('/getMembers', getMembers)
memberRouter.get('/getMember/:id', getMember)
memberRouter.get('/getRecent', getRecentMembers)
memberRouter.post('/addMember', addMember)
memberRouter.put('/updateMember/:id', updateMember)
memberRouter.delete('/deleteMember/:id', deleteMember)

module.exports = memberRouter