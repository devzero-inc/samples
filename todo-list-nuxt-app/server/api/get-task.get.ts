import { getTask } from '../../package/TaskRepository';

export default defineEventHandler(async () => {
    try {
        const tasks = await getTask();
        return {
            status: 200,
            tasks: tasks
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error.'
        };
    }
});