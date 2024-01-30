import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase.from('posts').select('*');

        if (error) throw error;
        return NextResponse.json({ posts: data, status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 401 });
        } else {
            return NextResponse.json({ message: 'An unexpected error occurred', status: 500 });
        }
    }
}