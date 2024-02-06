import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: NextRequest) {
    try {
        const login = req.nextUrl.searchParams.get("login") as string;
        const formdata = await req.formData();
        const email = formdata.get("email") as string;
        const password = formdata.get("password") as string;
        if (login) {
            const { data , error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return NextResponse.json({ message: "User logged in successfully", data: data, status: 200 });
        } else {
            const username = formdata.get("username") as string;
            
            console.log(username, email, password);
            if (!username) {
                return NextResponse.json({ message: 'Username is required', status: 400 });
            }
            if (!email) {
                return NextResponse.json({ message: 'Email is required', status: 400 });
            }
            if (!password) {
                return NextResponse.json({ message: 'Password is required', status: 400 });
            }

            const signUpResponse = await supabase.auth.signUp({ email, password });
            if (signUpResponse.error) throw signUpResponse.error;

            return NextResponse.json({ message: "user created successfuly", data:signUpResponse.data , status: 200 });
        }
    } catch (error) {
        // console.log(error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 401 });
        } else {
            return NextResponse.json({ message: 'An unexpected error occurred', status: 500 });
        }
    }
}