import {supabase} from './supabaseClient';
import { NextRequest } from 'next/server';

export async function authenticate(req: NextRequest) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        throw new Error('No token provided');
    }
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
        throw new Error('Invalid token');
    }
    return data;
}