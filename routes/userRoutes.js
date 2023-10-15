const express = require("express")
const UserModel = require('../models/User')


const routes = express.Router()

routes.post("/signup", async (req,res)=> {
    try{
        const user = new UserModel({
            ...req.body
        })
        await user.save()
        res.status(201).send(user + " has been created")

    }catch(error){
        res.status(500).send(error)

    }
})


routes.post("/login", async (req,res)=> {
    try{
        const{username, password} = req.body
        const user = await UserModel.findOne({ username})

        if(!user){
            return res.status(401).json({message: "Invalid username or password"})
        }

        if(user.password == password){
            res.status(200).json({
                status:true,
                username: user.username,
                message: "User has logged in."

            })
        }

       
    }catch(error){
        res.status(500).send(error)

    }
})

module.exports = routes