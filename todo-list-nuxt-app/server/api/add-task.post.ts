import { defineEventHandler, readBody } from 'h3';
import { addTask } from '../../repositories/TaskRepository';
import { TableNotFoundError, UnhandledError } from '../../errors/databaseerror';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const title = body.title;
        const todo = await addTask({ title });
        if (todo) {
            return {
                status: 200,
                message: 'Todo added successfully'
            };
        }
    } catch (err) {
        if (err instanceof TableNotFoundError) {
            return {
                status: 503,
                message: err.message
            };
        } else if (err instanceof UnhandledError) {
            return {
                status: 500,
                message: err.message
            };
        }
    }
});
