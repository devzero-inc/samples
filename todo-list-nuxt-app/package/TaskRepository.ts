import { sql } from '../lib/db';

export type todolist = {
    id: number;
    title: string;
    created_date: string
}

export const addTask = async (data: Pick<todolist, 'title'>) => {
    try {
        const result = await sql({
            query: `INSERT INTO tasks (title) VALUES (?);`,
            values: [data.title]
        });

        return result;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
}

export const deleteTask = async (data: Pick<todolist, 'id'>) => {
    try {
        const result = await sql({
            query: 'DELETE FROM tasks WHERE id = ?',
            values: [data.id]
        });
        return result;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
export const detail = async (id: string) => {
    try {
        const result = await sql({
            query: 'SELECT id, title, created_at FROM tasks WHERE id=?',
            values: [id]
        })

        return result;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
};


export const updateTask = async (id: number) => {
    try {
        await sql({
            query: `
                UPDATE tasks
                SET is_completed = true
                WHERE id = ?
            `,
            values: [id]
        });

        return { message: 'Task updated successfully' };
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const getTask = async () => {
    try {
        const result = await sql({
            query: 'SELECT * FROM tasks'
        }) as todolist[];
    
        return result;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}