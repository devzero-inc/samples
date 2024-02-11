import { sql } from '../lib/db';

export type todolist = {
    id: number;
    title: string;
    created_date: string
}

class CustomError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
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
        if((error as { code: string }).code === 'ER_NO_SUCH_TABLE') {
            throw new CustomError('Table not found', 'ER_NO_SUCH_TABLE');
        }
        else{
            throw new CustomError('Internal server error', 'UNHANDLED_ERROR');
        }
    }
}

export const deleteTask = async (data: Pick<todolist, 'id'>) => {
    try {
        const check = await sql({
            query: 'SELECT * FROM tasks WHERE id = ?',
            values: [data.id]
        });
        if(Array.isArray(check) && check.length === 0){
            throw new CustomError('Task not found', 'NOT_FOUND');
        } 

        const result = await sql({
            query: 'DELETE FROM tasks WHERE id = ?',
            values: [data.id]
        });
        return result;
    } catch (error) {
        console.error('Error getting task:', error);
        if((error as { code: string }).code === 'ER_NO_SUCH_TABLE') {
            throw new CustomError('Table not found', 'ER_NO_SUCH_TABLE');
        }
        else{
            throw new CustomError('Internal server error', 'UNHANDLED_ERROR');
        }
    }
};

export const updateTask = async (data: Pick<todolist, 'id'>) => {
    try {
        const check = await sql({
            query: 'SELECT * FROM tasks WHERE id = ?',
            values: [data.id]
        });
        if(Array.isArray(check) && check.length === 0){
            throw new CustomError('Task not found', 'NOT_FOUND');
        } 

        await sql({
            query: `
                UPDATE tasks
                SET is_completed = true
                WHERE id = ?
            `,
            values: [data.id]
        });

        return { message: 'Task updated successfully' };
    } catch (error) {
        console.error('Error getting task:', error);
        if((error as { code: string }).code === 'ER_NO_SUCH_TABLE') {
            throw new CustomError('Table not found', 'ER_NO_SUCH_TABLE');
        }
        else{
            throw new CustomError('Internal server error', 'UNHANDLED_ERROR');
        }
    }
};

export const getTask = async () => {
    try {
        const result = await sql({
            query: 'SELECT * FROM tasks'
        }) as todolist[];
    
        return result;
    } catch (error) {
        console.error('Error getting task:', error);
        if((error as { code: string }).code === 'ER_NO_SUCH_TABLE') {
            throw new CustomError('Table not found', 'ER_NO_SUCH_TABLE');
        }
        else{
            throw new CustomError('Internal server error', 'UNHANDLED_ERROR');
        }
    }
}