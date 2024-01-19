/* eslint-env jest */

const EmployeeService = require('../service/employeeService');
const Employee = require('../models/employee');

jest.mock('../models/employee');

const validEmployee = {
    name: 'Alex Johnson',
    designation: 'CTO & Co-Founder',
    employeeID: 'DZ001',
    bio: 'Co-founder/CTO. Previously lead developer at BlueTech. Graduated from Massachusetts Institute of Technology with a Masters in Computer Science.',
    about: 'Technology Leader',
    workHistory: {
        companyName: 'BlueTech',
        position: 'Lead Developer',
    },
    contactDetails: {
        email: 'alex.j@.com',
        phone: 1234567890,
    },
    profiles: {
        linkedIn: '',
        github: '',
    },
    profilePicture: 'https://i.imgur.com/HxTquEx.jpg',
}

const invalidEmployee = {
    bio: 'Co-founder/CTO. Previously lead developer at BlueTech. Graduated from Massachusetts Institute of Technology with a Masters in Computer Science.',
    about: 'Technology Leader',
    workHistory: {
        companyName: 'BlueTech',
        position: 'Lead Developer',
    },
    contactDetails: {
        email: 'alex.j@.com',
        phone: 1234567890,
    },
    profiles: {
        linkedIn: '',
        github: '',
    },
    profilePicture: 'https://i.imgur.com/HxTquEx.jpg',
}

describe('Employee Service', () => {
    let service;

    beforeEach(() => {
        service = new EmployeeService();
        jest.clearAllMocks();
    });

    describe('getAllEmployees', () => {
        it('should return all employees', async () => {

            const mockEmployees = [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' }
            ];

            Employee.find.mockResolvedValue(mockEmployees);

            const employees = await service.getAllEmployees();
            expect(Array.isArray(employees)).toBe(true);
            expect(employees.length).toBe(mockEmployees.length);

            employees.forEach((employee, index) => {
                expect(employee.id).toBe(mockEmployees[index].id);
                expect(employee.name).toBe(mockEmployees[index].name);
            });

        });

        it('should return an empty array if no employees exist', async () => {
            Employee.find.mockResolvedValue([]);

            const employees = await service.getAllEmployees();
            expect(Array.isArray(employees)).toBe(true);
            expect(employees.length).toBe(0);
        });

        it('should throw error if database is not connected', async () => {
            Employee.find.mockRejectedValue(new Error('Database not connected!'));
            await expect(service.getAllEmployees()).rejects.toThrow('Database not connected!');
        });
    });

    describe('getEmployee', () => {
        it('should return an employee if valid id is provided', async () => {

            const mockEmployee = { id: 1, name: 'John Doe' };

            Employee.findOne.mockResolvedValue({ id: 1, name: 'John Doe' });

            const validId = 'DZ001';
            const employee = await service.getEmployee(validId);
            expect(employee).toBeDefined();
            expect(typeof employee).toBe('object');
            expect(employee.id).toBe(mockEmployee.id);
            expect(employee.name).toBe(mockEmployee.name);
        });

        it('should return null if invalid id is provided', async () => {
            Employee.findOne.mockResolvedValue(null);

            const invalidId = '123';

            const employee = await service.getEmployee(invalidId);
            expect(employee).toBeFalsy();
        });

        it('should throw error if database is not connected', async () => {
            Employee.findOne.mockRejectedValue(new Error('Database not connected!'));
            await expect(service.getEmployee()).rejects.toThrow('Database not connected!');
        });
    });

    describe('addEmployee', () => {
        it('should return true if employee is added successfully', async () => {
            Employee.findOne.mockResolvedValue(null);
            Employee.prototype.save.mockResolvedValue(true);

            const result = await service.addEmployee(validEmployee);
            expect(result).toBe(true);
            expect(Employee.findOne).toHaveBeenCalledWith({ employeeID: validEmployee.employeeID });
        });

        it('should return false if employee already exists', async () => {
            Employee.findOne.mockResolvedValue(true);

            const result = await service.addEmployee(validEmployee);
            expect(result).toBe(false);
            expect(Employee.findOne).toHaveBeenCalledWith({ employeeID: validEmployee.employeeID });
        });

        it('should check for name, designation, and employeeID in the body', async () => {
            Employee.findOne.mockResolvedValue(null);
            Employee.prototype.save.mockResolvedValue(true);

            const result = await service.addEmployee(validEmployee);
            expect(result).toBe(true);
            expect(Employee.findOne).toHaveBeenCalledWith({ employeeID: validEmployee.employeeID });
            expect(Employee).toHaveBeenCalledWith(expect.objectContaining({
                name: validEmployee.name,
                designation: validEmployee.designation,
                employeeID: validEmployee.employeeID,
            }));
        });

        it('should throw error if database is not connected', async () => {
            Employee.findOne.mockRejectedValue(new Error('Database not connected!'));
            await expect(service.addEmployee(validEmployee)).rejects.toThrow('Database not connected!');
        });

        it('should throw error if name, employeeID and designation is not provided', async () => {
            Employee.findOne.mockRejectedValue(new Error('Name, employeeID and designation is required!'));
            await expect(service.addEmployee(invalidEmployee)).rejects.toThrow('Name, employeeID and designation is required!');
        });

    });

    describe('updateEmployee', () => {
        it('should return true if employee is updated successfully', async () => {
            Employee.findOneAndUpdate.mockResolvedValue(true);

            const result = await service.updateEmployee(validEmployee);
            expect(result).toBe(true);
            expect(Employee.findOneAndUpdate).toHaveBeenCalledWith({ employeeID: validEmployee.employeeID }, expect.objectContaining({
                name: validEmployee.name,
                designation: validEmployee.designation,
                employeeID: validEmployee.employeeID,
            }));
        });

        it('should return false if employee does not exist', async () => {
            Employee.findOneAndUpdate.mockResolvedValue(null);

            const result = await service.updateEmployee(validEmployee);
            expect(result).toBe(false);
            expect(Employee.findOneAndUpdate).toHaveBeenCalledWith({ employeeID: validEmployee.employeeID }, expect.objectContaining({
                name: validEmployee.name,
                designation: validEmployee.designation,
                employeeID: validEmployee.employeeID,
            }));
        });

        it('should throw error if database is not connected', async () => {
            Employee.findOneAndUpdate.mockRejectedValue(new Error('Database not connected!'));
            await expect(service.updateEmployee(validEmployee)).rejects.toThrow('Database not connected!');
        });

        it('should throw error if name, employeeID and designation is not provided', async () => {
            Employee.findOneAndUpdate.mockRejectedValue(new Error('Name, employeeID and designation is required!'));
            await expect(service.updateEmployee(invalidEmployee)).rejects.toThrow('Name, employeeID and designation is required!');
        });
    });

    describe('deleteEmployee', () => {
        it('should return true if employee is deleted successfully', async () => {
            Employee.findOneAndDelete.mockResolvedValue(true);

            const result = await service.deleteEmployee(validEmployee.employeeID);
            expect(result).toBe(true);
            expect(Employee.findOneAndDelete).toHaveBeenCalledWith({ employeeID: validEmployee.employeeID });
        });

        it('should return false if employee does not exist', async () => {
            Employee.findOneAndDelete.mockResolvedValue(null);

            const result = await service.deleteEmployee(validEmployee.employeeID);
            expect(result).toBe(false);
            expect(Employee.findOneAndDelete).toHaveBeenCalledWith({ employeeID: validEmployee.employeeID });
        });

        it('should throw error if database is not connected', async () => {
            Employee.findOneAndDelete.mockRejectedValue(new Error('Database not connected!'));
            await expect(service.deleteEmployee(validEmployee.employeeID)).rejects.toThrow('Database not connected!');
        });

        it('should throw error if employeeID is not provided', async () => {
            Employee.findOneAndDelete.mockRejectedValue(new Error('employeeID is required!'));
            await expect(service.deleteEmployee()).rejects.toThrow('employeeID is required!');
        });
    });

});