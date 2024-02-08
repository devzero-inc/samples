import { addTask, getTask, deleteTask, updateTask } from '../package/TaskRepository';
import defineEventHandler1 from '../server/api/add-task.post';
import defineEventHandler2 from '../server/api/get-task.get';
import defineEventHandler3 from '../server/api/delete-task.post';
import defineEventHanlder4 from '../server/api/update-task.put';
import { readBody } from 'h3';

jest.mock('h3', () => ({
    ...jest.requireActual('h3'),
    defineEventHandler: jest.fn().mockImplementation((handler) => handler),
}));


jest.mock('../package/TaskRepository', () => ({
    addTask: jest.fn(),
    getTask: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
}));

jest.mock('h3', () => ({
    ...jest.requireActual('h3'),
    readBody: jest.fn(),
}));

const createMockEvent = (body: any): any => ({
    req: {
        method: 'POST',
        headers: {},
        body,
    },
});

describe('POST /api/add-task', () => {
    it('should return status 200 if title added successfully', async () => {

        (readBody as jest.Mock).mockResolvedValueOnce({ title: 'Test Todo' });
        (addTask as jest.Mock).mockResolvedValueOnce({ id: 1, title: 'Test Todo' });
        const mockEvent = createMockEvent({ title: 'Test Todo' });

        const response = await defineEventHandler1(mockEvent);

        expect(response).toEqual({
            status: 200,
            message: 'Todo added successfully',
        });
    });

    it('should return status 500 if database is not connected', async () => {
        (readBody as jest.Mock).mockResolvedValueOnce({ title: 'Test Todo' });
        (addTask as jest.Mock).mockResolvedValueOnce(null);
        const mockEvent = createMockEvent({ title: 'Test Todo' });

        const response = await defineEventHandler1(mockEvent);

        expect(response).toEqual({
            status: 500,
            message: 'Internal server error.',
        });
    });
});

describe('GET /api/get-task', () => {
    it('should return status 200 if tasks are fetched successfully', async () => {
        (getTask as jest.Mock).mockResolvedValueOnce([{ id: 1, title: 'Test Todo' }]);
        const mockEvent = createMockEvent(null);

        const response = await defineEventHandler2(mockEvent);

        expect(response).toEqual({
            status: 200,
            tasks: [{ id: 1, title: 'Test Todo' }],
        });
    });

    it('should return status 500 if database is not connected', async () => {
        (getTask as jest.Mock).mockResolvedValueOnce(null);
        const mockEvent = createMockEvent(null);

        const response = await defineEventHandler2(mockEvent);

        expect(response).toEqual({
            status: 500,
            message: 'Internal server error.',
        });
    });
});

describe('POST /api/delete-task', () => {
    it('should return status 200 if task is deleted successfully', async () => {
        (readBody as jest.Mock).mockResolvedValueOnce({ id: '123' });
        (deleteTask as jest.Mock).mockResolvedValueOnce(true);
        const mockEvent = createMockEvent({ id: '123' });

        const response = await defineEventHandler3(mockEvent);

        expect(response).toEqual({
            status: 200,
            message: 'Deleted successfully',
        });
    });

    it('should return status 500 if database is not connected', async () => {
        (readBody as jest.Mock).mockResolvedValueOnce({ id: '123' });
        (deleteTask as jest.Mock).mockResolvedValueOnce(false);
        const mockEvent = createMockEvent({ id: '123' });

        const response = await defineEventHandler3(mockEvent);

        expect(response).toEqual({
            status: 500,
            message: 'Internal server error.',
        });
    });
});

describe('PUT /api/update-task', () => {
    it('should return status 200 if task is updated successfully', async () => {
        (readBody as jest.Mock).mockResolvedValueOnce({ id: '123' });
        (updateTask as jest.Mock).mockResolvedValueOnce({ message: 'Task updated successfully' });
        const mockEvent = createMockEvent({ id: '123' });

        const response = await defineEventHanlder4(mockEvent);

        expect(response).toEqual({
            status: 200,
            message: 'Updated successfully',
        });
    });

    it('should return status 500 if database is not connected', async () => {
        (readBody as jest.Mock).mockResolvedValueOnce({ id: '123' });
        (updateTask as jest.Mock).mockResolvedValueOnce(null);
        const mockEvent = createMockEvent({ id: '123' });

        const response = await defineEventHanlder4(mockEvent);

        expect(response).toEqual({
            status: 500,
            message: 'Internal server error.',
        });
    });
});