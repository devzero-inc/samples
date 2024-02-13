import { defineEventHandler } from 'h3';
import { getTask } from '../../repositories/TaskRepository';
import { TableNotFoundError, UnhandledError } from '../../errors/databaseerror';

export default defineEventHandler(async () => {
    try {
        const tasks = await getTask();
        if (tasks) {
            return {
                status: 200,
                tasks: tasks
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
