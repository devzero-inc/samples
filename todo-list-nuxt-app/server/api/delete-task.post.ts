import { defineEventHandler, readBody } from 'h3';
import { deleteTask } from '../../repositories/TaskRepository';
import { TableNotFoundError, TaskNotFoundError, UnhandledError } from '../../errors/databaseerror';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const id = body.id;
        const result = await deleteTask({ id });
        if (result) {
            return {
                status: 200,
                message: 'Deleted successfully'
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
