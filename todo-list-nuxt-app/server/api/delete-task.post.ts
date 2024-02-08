import { defineEventHandler, readBody } from 'h3';
import {deleteTask} from '../../package/TaskRepository';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const result = await deleteTask({id});
    if(result) {
        return {
            status: 200,
            message: 'Deleted successfully'
        }
    }
    else {
        return {
            status: 500,
            message: 'Internal server error.'
        }
    }   
});