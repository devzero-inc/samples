import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { authenticate } from '../../../lib/authenticate';
import { getExistingVote, updateVote, addVote } from '../../../utils/controller';

export async function POST(req: NextRequest) {
    try {
        const user = await authenticate(req);

        const formdata = await req.formData();
        const postId = formdata.get("postId") as string;
        const userId = formdata.get("userId") as string;
        const type = formdata.get("type") as string;

        if (!postId || !userId) {
            return NextResponse.json({ message: 'Post ID and User ID are required', status: 400 });
        }
        if (!type) {
            return NextResponse.json({ message: 'Vote type is required', status: 400 });
        }

        const existingVote = await getExistingVote(postId, userId);

        if (existingVote) {
            await updateVote(postId, userId, type);
            return NextResponse.json({ message: "Vote updated successfully", status: 201 });
        } else {
            const date = new Date();
            const id = uuidv4();
            await addVote(id, postId, userId, type);
            return NextResponse.json({ message: "Vote recorded successfully", data: { id: id, postId: postId, userId: userId, type: type, createdAt: date, updatedAt: date }, status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'An unexpected error occurred', status: 500 });
    }
}