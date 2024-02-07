import {addTask} from '../../package/TaskRepository';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const title = body.title;
    const todo = await addTask({ title });
    if(todo) {
        return {
            status: 200,
            message:  'Todo added successfully'
        }
    }
    else {
        return {
            status: 500,
            message: 'Internal server error.'
        }
    }
})
