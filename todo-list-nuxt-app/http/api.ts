import axios from "axios";

interface Task {
    id: string;
    title: string;
    is_completed: number;
    created_at: string;
}

export const fetchTasks = async (): Promise<Task[] | null> => {
    try {
        const response = await axios.get('/api/get-task');
        return response.data.tasks || null;
    } catch (error) {
        console.error('Failed to fetch todos', error);
        return null;
    }
};

export const addTask = async (title: string) => {
    try {
        const response = await axios.post('/api/add-task', { title: title });
    } catch (error) {
        console.error('Failed to add task', error);
        return null;
    }
};

export const updateTask = async (id: string) => {
    try {
        const response = await axios.put('/api/update-task', { id: id});
    } catch (error) {
        console.error('Failed to update task', error);
        return null;
    }
}

export const deleteTask = async (id: string) => {
    try {
        const response = await axios.post('/api/delete-task', { id: id });
    } catch (error) {
        console.error('Failed to delete task', error);
        return null;
    }
}