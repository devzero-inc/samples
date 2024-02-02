import { NextRequest, NextResponse } from 'next/server';
import { getVotes, getPosts } from '../../../utils/controller';

export async function POST(req: NextRequest) {
    try {

        const postId = req.nextUrl.searchParams.get("postId") as string;

        if (postId) {
            const {data, error} = await getVotes(postId);

            if (error) throw error;
            return NextResponse.json({ votes: data, status: 200 });
        } else {
            const { data, error } = await getPosts();

            if (error) throw error;
            return NextResponse.json({ posts: data, status: 200 });
        }
    } catch (error) {
        if (error) {
            return NextResponse.json({ message: error, status: 401 });
        } else {
            return NextResponse.json({ message: 'An unexpected error occurred', status: 500 });
        }
    }
}