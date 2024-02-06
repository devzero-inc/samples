import { sql } from '../../lib/db';

export type todolist = {
    id: number;
    title: string;
    created_date: string
}

export const create = async (data: Pick<todolist, 'title'>) => {
    const result = await sql({
        query: `
        INSERT INTO tasks (
            title
        ) VALUES(
            ?
        ) RETURNING *
        `,
        values: [data.title]
    }) as any;

    return result.length === 1 ? result[0] as todolist : null;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const title = body.title;
    const todo = await create({ title });
    if(todo) {
        return {
            status: 200,
            body: todo
        }
    }
    else {
        return {
            status: 500,
            body: { message: 'Failed to create todo' }
        }
    }
})
