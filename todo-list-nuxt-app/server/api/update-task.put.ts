import { defineEventHandler, readBody } from 'h3';
import { updateTask } from '../../package/TaskRepository';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const id = body.id;
        const todo = await updateTask({ id });
        if (todo) {
            return {
                status: 200,
                message: 'Updated successfully',
            }
        }

    } catch (err) {
        if ((err as { code: string }).code === "ER_NO_SUCH_TABLE") {
            return {
                status: 503,
                message: 'Table not found.'
            }
        }
        else if ((err as { code: string }).code === "NOT_FOUND") {
            return {
                status: 404,
                message: 'Task not found.'
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