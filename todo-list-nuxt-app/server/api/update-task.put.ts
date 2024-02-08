import { defineEventHandler, readBody } from 'h3';
import {updateTask} from '../../package/TaskRepository';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const todo = await updateTask({id});
    if(todo) {
        return {
            status: 200,
            message: 'Updated successfully',
        }
    }
    else {
        return {
            status: 500,
            message: 'Internal server error.'
        }
    }
});