"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/http/api";

const SignIn = () => {

    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const loginResponse = loginUser(email, password);
        loginResponse.then((data) => {
            localStorage.setItem("session", JSON.stringify(data.data.session));
            localStorage.setItem("name", data.userData.name);
            window.dispatchEvent(new Event("storageUpdate"));
            router.push('/');
        }).catch((err) => console.log(err));
    }

    return (
        <div className=" bg-cusWhite border border-cusBorderSec flex-1 w-[50%] mb-5 rounded-lg text-cusBorderSec p-4 flex flex-col items-center justify-around">
            <h1 className=" text-6xl font-bold bg-clip-text text-transparent bg-custom-gradient p-2">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSignin}>
                <input className="px-4 py-3 rounded-lg border border-cusBorderSec bg-cusWhite placeholder-cusBorderSec text-cusBorderSec outline-none" type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
                <input className="px-4 py-3 rounded-lg border border-cusBorderSec bg-cusWhite placeholder-cusBorderSec text-cusBorderSec outline-none" type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
                <Link href="/auth/signup" className="outline-none text-center">
                    Don&apos;t have an account? <span className="bg-clip-text text-transparent bg-custom-gradient">Signup</span>
                </Link>
                <button type="submit" className=" bg-custom-gradient px-4 py-3 rounded-lg outline-none text-cusWhite font-bold">
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default SignIn
