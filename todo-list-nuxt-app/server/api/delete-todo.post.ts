import { sql } from '../../lib/db';


export type todolist = {
    id: number;
    title: string;
    created_date: string
}

export const remove = async (id: string) =>{
    await sql({
        query: 'DELETE FROM tasks WHERE id = ?',
        values: [id]
    });

    return true;
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const result = await remove(id);
    if(result) {
        return {
            status: 200,
            body: { message: 'Deleted successfully' }
        }
    }
    else {
        return {
            status: 500,
            body: { message: 'Failed to delete todo' }
        }
    }   
});