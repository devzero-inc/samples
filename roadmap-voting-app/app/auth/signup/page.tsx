"use client";

import Link from "next/link";
import { useState } from "react";

const Signup = () => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newFormData = new FormData();
        newFormData.append("name", name);
        newFormData.append("email", email);
        newFormData.append("password", password);

        fetch("/api/user", {
            method: "POST",
            body: newFormData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.location.href = '/auth/signin';
        })
        .catch(err => console.log(err));
    }

    return (
        <div className=" bg-cusSec border border-cusBorder flex-1 w-[50%] mb-5 rounded-lg text-white p-4 flex flex-col items-center justify-around">
            <h1 className=" text-6xl font-bold bg-clip-text text-transparent bg-custom-gradient p-2">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <input className=" px-4 py-3 rounded-lg bg-cusInput outline-none" type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
                <input className=" px-4 py-3 rounded-lg bg-cusInput outline-none" type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
                <input className=" px-4 py-3 rounded-lg bg-cusInput outline-none" type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                <Link href="/auth/signin" className="outline-none text-center">
                    Already have an account? <span className="bg-clip-text text-transparent bg-custom-gradient">Signin</span>
                </Link>
                <button type="submit" className=" bg-custom-gradient px-4 py-3 rounded-lg outline-none">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Signup
