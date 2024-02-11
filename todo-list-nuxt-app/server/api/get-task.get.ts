import { defineEventHandler } from 'h3';
import { getTask } from '../../package/TaskRepository';

export default defineEventHandler(async () => {
    try{
        const tasks = await getTask();
        if (tasks) {
            return {
                status: 200,
                tasks: tasks
            };
        }
    } catch(err) {
        if((err as { code: string }).code === 'ER_NO_SUCH_TABLE') {
            return {
                status: 503,
                message: 'Table not found.'
            }
        }
        else {
            return {
                status: 500,
                message: 'Internal server error.'
            }
        }
    }
});