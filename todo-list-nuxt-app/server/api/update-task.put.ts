import { defineEventHandler, readBody } from 'h3';
import { updateTask } from '../../repositories/TaskRepository';
import { TableNotFoundError, TaskNotFoundError, UnhandledError } from '../../errors/databaseerror';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const id = body.id;
        const todo = await updateTask({ id });
        if (todo) {
            return {
                status: 200,
                message: 'Updated successfully',
            };
        }
    } catch (err) {
        if (err instanceof TableNotFoundError) {
            return {
                status: 503,
                message: err.message
            };
        } else if (err instanceof TaskNotFoundError) {
            return {
                status: 404,
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
