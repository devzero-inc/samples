import { sql } from '../../lib/db';

export type todolist = {
    id: number;
    title: string;
    created_date: string
}

export const detail= async (id: string) =>{
    const result = await sql({
        query: 'SELECT id, title, created_date FROM todos WHERE id=?',
        values: [id]
    })

    return result;
};

export const update = async (id: string, data: Pick<todolist, 'title'> )=>{
    await sql({
       query: `
       UPDATE tasks
       SET 
       title = ?,
       WHERE id = ?
       `,
       values: [data.title, id]
   }) 

   return await detail(id);
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const title = body.title;
    const todo = await update(id, { title });
    if(todo) {
        return {
            status: 200,
            body: todo
        }
    }
    else {
        return {
            status: 500,
            body: { message: 'Failed to update todo' }
        }
    }
});