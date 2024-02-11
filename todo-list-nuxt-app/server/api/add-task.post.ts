import { defineEventHandler, readBody } from 'h3';
import {addTask} from '../../package/TaskRepository';

export default defineEventHandler(async (event) => {
    try{

        const body = await readBody(event);
        const title = body.title;
        const todo = await addTask({ title });
        if(todo) {
            return {
                status: 200,
                message:  'Todo added successfully'
            }
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
})
