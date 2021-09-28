
const express = require('express')
const { rmdirSync } = require('fs')
const User = require('./users/model')
const server = express()

server.get('/api/users', (req,res) => {
    User.find()
    .then(users => {
     
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: "error getting users",
            err: err.message,
            stack: err.stack
        })
    })
    
})

server.get('/api/users/:id', (req,res) => {
    User.findById(req.params.id)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            message: "User not found",
            err: err.message,
            stack: err.stack
        })
    })
})


server.use('*', (req,res) => {
    res.status(404).json({
        message: "not found"
    })
})

module.exports = server; 
