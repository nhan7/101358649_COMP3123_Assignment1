const express = require("express")
const EmployeeModel = require('../models/Employee')
const routes = express.Router()

// get all employees
routes.get("/employees", async (req, res) => {
    try{
        const employeeList = await EmployeeModel.find({})
        res.status(200).send(employeeList)
    }catch(error){
        res.status(500).send(error)

    }



    
})

// add employee

routes.post("/employees", async (req, res) => {
    try{
        const newEmployee = new EmployeeModel({
            ...req.body
        })
        await newEmployee.save()
        // BookModel.create({})
        res.status(200).send(newEmployee)
    }catch(error){
        res.status(500).send(error)
    }


})
routes.get("/employees/:eid", async(req, res) => {
    try{
        const employee = await EmployeeModel.findById(req.params.eid)
        if(!employee){
            res.status(400).json({message: "cannot find employee"})

        }
        res.status(200).send(employee)


    }catch(error){
        res.status(400).json(error)
    }
})


routes.put("/employees/:eid", async (req, res) => {
    try{
        const update = await EmployeeModel.findByIdAndUpdate(req.params.eid, req.body, {new: true})
        if(!update){
            res.status(404).send({message: "Employee not found"})
        }
        res.status(200).json(update)
    }catch(error){
        res.status(400).json({message: "Error updating employee"})
    }
})




routes.delete("/employees", async (req, res) => {
    try{
        const employee = await EmployeeModel.deleteOne(req.params.eid)
        if(!employee){
            res.status(404).send({message: "Employee not found"})
        }
        res.status(204).send()
        

    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = routes