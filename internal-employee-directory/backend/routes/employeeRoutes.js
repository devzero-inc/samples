const express = require('express');
const router = express.Router();
const EmployeeService = require('../service/employeeService');
const employeeService = new EmployeeService();

router.get('/get-all', async (req, res) => {
    try {
        const allEmployees = await employeeService.getAllEmployees();
        if(!allEmployees){
            return res.status(404).json({ message: "Employees not found!" });
        }
        res.status(200).json({ employees: allEmployees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get('/get-one', async (req, res) => {
    try {
        const { id } = req.query;
        const employee = await employeeService.getEmployee(id);
        if(!employee){
            return res.status(404).json({ message: "Employee not found!" });
        }
        res.status(200).json({ employee: employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.post('/add-one', async (req, res) => {
    try {
        const result = await employeeService.addEmployee(req.body);
        if(result){
            return res.status(200).json({ message: "Employee added successfully!" });
        }
        res.status(400).json({ message: "Employee already exists!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.put('/update-one', async (req, res) => {
    try {
        const existingEmployee = await employeeService.updateEmployee(req.body);
        if(!existingEmployee){
            return res.status(404).json({ message: "Employee not found!" });
        }
        res.status(200).json({ message: "Employee updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.delete('/delete-one', async(req, res) => {
    try {
        const { employeeID } = req.body;
        const existingEmployee = await employeeService.deleteEmployee(employeeID);
        if(!existingEmployee){
            return res.status(404).json({ message: "Employee not found!" });
        }
        res.status(200).json({ message: "Employee deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

module.exports = router;