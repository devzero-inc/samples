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

    it('should return null and log an error on fetch failure', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValueOnce(error);

        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const result = await fetchTasks();

        expect(mockedAxios.get).toHaveBeenCalledWith('/api/get-task');
        expect(result).toBeNull();
        expect(errorSpy).toHaveBeenCalledWith('Failed to fetch todos', error);

        errorSpy.mockRestore();
    });
});

describe('addTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a task successfully', async () => {
        const title = 'New Task';

        mockedAxios.post.mockResolvedValueOnce({});

        const result = await addTask(title);

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/add-task', { title });
        expect(result).toBeUndefined();
    });

    it('should return null and log an error on failure to add task', async () => {
        const title = 'New Task';

        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValueOnce(error);

        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const result = await addTask(title);

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/add-task', { title });
        expect(result).toBeNull();
        expect(errorSpy).toHaveBeenCalledWith('Failed to add task', error);

        errorSpy.mockRestore();
    });
});

describe('updateTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a task successfully', async () => {
        const id = '1';

        mockedAxios.put.mockResolvedValueOnce({});

        const result = await updateTask(id);

        expect(mockedAxios.put).toHaveBeenCalledWith('/api/update-task', { id });
        expect(result).toBeUndefined();
    });

    it('should return null and log an error on failure to update task', async () => {
        const id = '1';

        const error = new Error('Network error');
        mockedAxios.put.mockRejectedValueOnce(error);

        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const result = await updateTask(id);

        expect(mockedAxios.put).toHaveBeenCalledWith('/api/update-task', { id });
        expect(result).toBeNull();
        expect(errorSpy).toHaveBeenCalledWith('Failed to update task', error);

        errorSpy.mockRestore();
    });
});

describe('deleteTask', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a task successfully', async () => {
        const id = '1';

        mockedAxios.post.mockResolvedValueOnce({});

        const result = await deleteTask(id);

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/delete-task', { id });
        expect(result).toBeUndefined();
    });

    it('should return null and log an error on failure to delete task', async () => {
        const id = '1';

        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValueOnce(error);

        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const result = await deleteTask(id);

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/delete-task', { id });
        expect(result).toBeNull();
        expect(errorSpy).toHaveBeenCalledWith('Failed to delete task', error);

        errorSpy.mockRestore();
    });
});