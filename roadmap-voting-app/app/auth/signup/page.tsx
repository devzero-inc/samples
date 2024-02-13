"use client";

import Link from "next/link";
import { useState } from "react";
import { createUser } from "@/http/api";

const Signup = () => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const signupResponse = createUser(name, email, password);
        signupResponse.then((data) => {
            window.location.href = '/auth/signin';
        }).catch((err) => console.log(err));
    }

    return (
        <div className=" bg-cusWhite border border-cusBorderSec flex-1 w-[50%] mb-5 rounded-lg text-cusBorderSec p-4 flex flex-col items-center justify-around">
            <h1 className=" text-6xl font-bold bg-clip-text text-transparent bg-custom-gradient p-2">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <input className=" px-4 py-3 rounded-lg border border-cusBorderSec bg-cusWhite placeholder-cusBorderSec text-cusBorderSec outline-none" type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
                <input className=" px-4 py-3 rounded-lg border border-cusBorderSec bg-cusWhite placeholder-cusBorderSec text-cusBorderSec outline-none" type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
                <input className=" px-4 py-3 rounded-lg border border-cusBorderSec bg-cusWhite placeholder-cusBorderSec text-cusBorderSec outline-none" type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                <Link href="/auth/signin" className="outline-none text-center">
                    Already have an account? <span className="bg-clip-text text-transparent bg-custom-gradient">Signin</span>
                </Link>
                <button type="submit" className=" bg-custom-gradient px-4 py-3 rounded-lg outline-none text-cusWhite font-bold">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Signup
