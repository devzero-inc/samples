const Employee = require('../models/employee');

class EmployeeService {
    async getAllEmployees() {
        const existingEmployees = await Employee.find({});
        return existingEmployees;
    }

    async getEmployee(id) {
        const existingEmployee = await Employee.findOne({ employeeID: id });
        return existingEmployee;
    }

    async addEmployee(body) {
        const existingEmployee = await Employee.findOne({ employeeID: body.employeeID });
        if (existingEmployee) {
            return false;
        }

        const newEmployee = new Employee({
            name: body.name,
            designation: body.designation,
            employeeID: body.employeeID,
            bio: body.bio,
            about: body.about,
            workHistory: body.workHistory,
            contactDetails: body.contactDetails,
            profiles: body.profiles,
            profilePicture: body.profilePicture,
        });

        await newEmployee.save();
        return true;
    }

    async updateEmployee(body) {
        const existingEmployee = await Employee.findOneAndUpdate({ employeeID: body.employeeID }, {
            name: body.name,
            designation: body.designation,
            employeeID: body.employeeID,
            bio: body.bio,
            about: body.about,
            workHistory: body.workHistory,
            contactDetails: body.contactDetails,
            profiles: body.profiles,
            profilePicture: body.profilePicture,
        });

        if (!existingEmployee) {
            return false;
        }

        return true;
    }

    async deleteEmployee(id) {
        const existingEmployee = await Employee.findOneAndDelete({ employeeID: id });
        if (!existingEmployee) {
            return false;
        }

        return true;
    }
}

module.exports = EmployeeService;