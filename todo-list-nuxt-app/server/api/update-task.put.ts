import {updateTask} from '../../package/TaskRepository';

export type todolist = {
    id: number;
    title: string;
    created_date: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const todo = await updateTask(id);
    if(todo) {
        return {
            status: 200,
            body: todo
        }
    }
    else {
        return {
            status: 500,
            message: 'Internal server error.'
        }
    }
});