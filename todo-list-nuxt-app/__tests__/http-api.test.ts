import axios from "axios";
import type { AxiosStatic  } from 'axios';
import { fetchTasks, addTask, updateTask, deleteTask } from "../http/api";

interface Task {
    id: string;
    title: string;
    is_completed: number;
    created_at: string;
}


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('fetchTasks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an array of tasks on successful fetch', async () => {
        const tasks: Task[] = [
            {
                id: '1',
                title: 'Task 1',
                is_completed: 0,
                created_at: '2022-01-01',
            },
            {
                id: '2',
                title: 'Task 2',
                is_completed: 1,
                created_at: '2022-01-02',
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: { tasks } });

        const result = await fetchTasks();

        expect(mockedAxios.get).toHaveBeenCalledWith('/api/get-task');
        expect(result).toEqual(tasks);
    });

    it('should throw an error on fetch failure', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValueOnce(error);

        await expect(fetchTasks()).rejects.toThrow(error);

        expect(mockedAxios.get).toHaveBeenCalledWith('/api/get-task');
    });
});

describe('addTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a task successfully', async () => {
        const title = 'New Task';
        mockedAxios.post.mockResolvedValueOnce({});
        
        await expect(addTask(title)).resolves.toBeUndefined();
        
        expect(mockedAxios.post).toHaveBeenCalledWith('/api/add-task', { title });
    });

    it('should throw an error on failure to add task', async () => {
        const title = 'New Task';
        const error = new Error('Network error');
        
        mockedAxios.post.mockRejectedValueOnce(error);
        
        await expect(addTask(title)).rejects.toThrow(error);
        
        expect(mockedAxios.post).toHaveBeenCalledWith('/api/add-task', { title });
    });
});

describe('updateTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a task successfully', async () => {
        const id = '1';
        mockedAxios.put.mockResolvedValueOnce({});
        
        await expect(updateTask(id)).resolves.toBeUndefined();

        expect(mockedAxios.put).toHaveBeenCalledWith('/api/update-task', { id });
    });

    it('should throw an error on failure to update task', async () => {
        const id = '1';
        const error = new Error('Network error');
        mockedAxios.put.mockRejectedValueOnce(error);

        await expect(updateTask(id)).rejects.toThrow(error);

        expect(mockedAxios.put).toHaveBeenCalledWith('/api/update-task', { id });
    });
});

describe('deleteTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a task successfully', async () => {
        const id = '1';
        mockedAxios.post.mockResolvedValueOnce({});
        
        await expect(deleteTask(id)).resolves.toBeUndefined();

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/delete-task', { id });
    });

    it('should throw an error on failure to delete task', async () => {
        const id = '1';
        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValueOnce(error);

        await expect(deleteTask(id)).rejects.toThrow(error);

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/delete-task', { id });
    });
});
