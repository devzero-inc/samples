import axios from "axios";

interface Task {
    id: string;
    title: string;
    is_completed: number;
    created_at: string;
}

export const fetchTasks = async (): Promise<Task[] | null> => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('/api/get-task');
        return response.data.tasks || null;
    } catch (error) {
        throw error;
    }
};

export const addTask = async (title: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        await axios.post('/api/add-task', { title: title });
    } catch (error) {
        throw error;
    }
};

export const updateTask = async (id: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        await axios.put('/api/update-task', { id: id});
    } catch (error) {
        throw error;
    }
}

export const deleteTask = async (id: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        await axios.post('/api/delete-task', { id: id });
    } catch (error) {
        throw error;
    }
}