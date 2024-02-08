import { defineEventHandler } from 'h3';
import { getTask } from '../../package/TaskRepository';

export default defineEventHandler(async () => {
    const tasks = await getTask();
    if (tasks) {
        return {
            status: 200,
            tasks: tasks
        };
    }
    else {
        return {
            status: 500,
            message: 'Internal server error.'
        };
    }
});