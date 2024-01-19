const app = require('../app');
const request = require('supertest');
const EmployeeService = require('../service/employeeService');

jest.mock('../service/employeeService');

const sampleBody = {
    name: 'John Doe',
    designation: 'Software Engineer',
    employeeID: 'EMP001',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    workHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    contactDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profiles: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profilePicture: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
};

describe('Employee Routes', () => {


    describe('GET /api/employees/get-all', () => {
        it('should return all employees', async () => {

            jest.spyOn(EmployeeService.prototype, 'getAllEmployees')
                .mockResolvedValue([
                    { id: 1, name: 'John Doe' },
                    { id: 2, name: 'Jane Doe' }
                ]);

            const response = await request(app).get('/api/employees/get-all');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('employees');
            expect(Array.isArray(response.body.employees)).toBe(true);
        });

        it('should return 404 if no employees found', async () => {

            jest.spyOn(EmployeeService.prototype, 'getAllEmployees')
                .mockResolvedValue([]);

            const response = await request(app).get('/api/employees/get-all');
            expect(response.statusCode).toBe(404);
        });

        it('should return 500 if error occurs', async () => {
            jest.spyOn(EmployeeService.prototype, 'getAllEmployees')
                .mockRejectedValue(new Error('Internal server error!'));

            const response = await request(app).get('/api/employees/get-all');
            expect(response.statusCode).toBe(500);
        });
    });

    describe('GET /api/employees/get-one', () => {

        it('should return an employee with status 200 if valid id is provided', async () => {

            jest.spyOn(EmployeeService.prototype, 'getEmployee')
                .mockResolvedValue({ id: 1, name: 'John Doe' });

            const validId = '12345'; // = 6 characters long

            const response = await request(app).get(`/api/employees/get-one?id=${validId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('employee');
            expect(typeof response.body.employee).toBe('object');

        });

        it('should return 404 if no employee found or invalid id is provided', async () => {

            jest.spyOn(EmployeeService.prototype, 'getEmployee')
                .mockResolvedValue(null);

            const invalidId = '123'; // < 6 characters long

            const response = await request(app).get(`/api/employees/get-one?id=${invalidId}`);
            expect(response.statusCode).toBe(404);
        });

        it('should return 500 if error occurs', async () => {
            jest.spyOn(EmployeeService.prototype, 'getEmployee')
                .mockRejectedValue(new Error('Internal server error!'));

            const response = await request(app).get(`/api/employees/get-one?id=123`);
            expect(response.statusCode).toBe(500);
        });

    });

    describe('POST /api/employees/add-one', () => {
        it('should return 200 if employee is added successfully', async () => {

            jest.spyOn(EmployeeService.prototype, 'addEmployee')
                .mockResolvedValue(true);

            const response = await request(app).post('/api/employees/add-one').send(sampleBody);

            expect(response.statusCode).toBe(200);
        });

        it('should return 400 if employee already exists', async () => {

            jest.spyOn(EmployeeService.prototype, 'addEmployee')
                .mockResolvedValue(false);

            const response = await request(app).post('/api/employees/add-one').send(sampleBody);
            expect(response.statusCode).toBe(400);
        });

        it('should return 500 if error occurs', async () => {
            jest.spyOn(EmployeeService.prototype, 'addEmployee')
                .mockRejectedValue(new Error('Internal server error!'));

            const response = await request(app).post('/api/employees/add-one').send(sampleBody);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('PUT /api/employees/update-one', () => {
        it('should return 200 if employee is updated successfully', async () => {

            jest.spyOn(EmployeeService.prototype, 'updateEmployee')
                .mockResolvedValue(true);

            const response = await request(app).put('/api/employees/update-one').send(sampleBody);

            expect(response.statusCode).toBe(200);
        });

        it('should return 404 if employee not found', async () => {

            jest.spyOn(EmployeeService.prototype, 'updateEmployee')
                .mockResolvedValue(false);

            const response = await request(app).put('/api/employees/update-one').send(sampleBody);
            expect(response.statusCode).toBe(404);
        });

        it('should return 500 if error occurs', async () => {
            jest.spyOn(EmployeeService.prototype, 'updateEmployee')
                .mockRejectedValue(new Error('Internal server error!'));

            const response = await request(app).put('/api/employees/update-one').send(sampleBody);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/employees/delete-one', () => {
        it('should return 200 if employee is deleted successfully', async () => {

            jest.spyOn(EmployeeService.prototype, 'deleteEmployee')
                .mockResolvedValue(true);

            const response = await request(app).delete('/api/employees/delete-one').send({ employeeID: 'EMP001' });

            expect(response.statusCode).toBe(200);
        });

        it('should return 404 if employee not found', async () => {

            jest.spyOn(EmployeeService.prototype, 'deleteEmployee')
                .mockResolvedValue(false);

            const response = await request(app).delete('/api/employees/delete-one').send({ employeeID: 'EMP001' });
            expect(response.statusCode).toBe(404);
        });

        it('should return 500 if error occurs', async () => {
            jest.spyOn(EmployeeService.prototype, 'deleteEmployee')
                .mockRejectedValue(new Error('Internal server error!'));

            const response = await request(app).delete('/api/employees/delete-one').send({ employeeID: 'EMP001' });
            expect(response.statusCode).toBe(500);
        });
    });

    
});