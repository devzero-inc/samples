import { NextRequest, NextResponse } from 'next/server';
import { signInWithSupabase, getUserFromSupabase, signUpWithSupabase, insertUserToSupabase } from '../../../utils/controller';

export async function POST(req: NextRequest) {
    try {
        const login = req.nextUrl.searchParams.get("login") as string;
        if (login) {
            const formdata = await req.formData();
            const email = formdata.get("email") as string;
            const password = formdata.get("password") as string;

            const signInresponse = await signInWithSupabase(email, password);
            if (signInresponse.error) throw signInresponse.error;

            const userId = signInresponse.data.user.id;

            const { data: userData, error: userError } = await getUserFromSupabase(userId);

            if (userError) throw userError;
            return NextResponse.json({ message: "User logged in successfully", data: signInresponse.data, userData: userData, status: 200 });
        } else {
            const formdata = await req.formData();
            const username = formdata.get("name") as string;
            const email = formdata.get("email") as string;
            const password = formdata.get("password") as string;
            
            if (!username) {
                return NextResponse.json({ message: 'Username is required', status: 400 });
            }
            if (!email) {
                return NextResponse.json({ message: 'Email is required', status: 400 });
            }
            if (!password) {
                return NextResponse.json({ message: 'Password is required', status: 400 });
            }

            const signUpResponse = await signUpWithSupabase(email, password);
            if (signUpResponse.error) throw signUpResponse.error;

            if (signUpResponse.data.user) {
                const { error: insertError } = await insertUserToSupabase(signUpResponse.data.user.id, username, email);

                if (insertError) throw insertError;
            }

            return NextResponse.json({ message: "user created successfuly", data:signUpResponse.data, status: 200 });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 401 });
        } else {
            return NextResponse.json({ message: 'An unexpected error occurred', status: 500 });
        }
    }
}