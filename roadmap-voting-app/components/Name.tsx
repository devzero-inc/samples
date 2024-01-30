"use client";

import { useState, useEffect } from "react";
import Link from "next/link"

const Name = () => {

    const [name, setName] = useState<string>('');

    useEffect(() => {
        const loadName = () => {
            const storedName = localStorage.getItem("name");
            if (storedName) {
                setName(storedName);
            }
        };

        // Load name initially and on custom storage update events
        loadName();
        window.addEventListener("storageUpdate", loadName);

        // Clean up the event listener
        return () => {
            window.removeEventListener("storageUpdate", loadName);
        };
    }, []);

    // useEffect(() => {
    //     const name: string | null = localStorage.getItem("name");
    //     if (name) {
    //         setName(name);
    //     }
    // }, [])

    return (
        <div>
            {name ?
                <div className="flex gap-4 items-center px-4 text-2xl font-semibold">{name}</div>
                :
                <div className="flex gap-4 items-center px-4">

                    <Link href="/auth/signin" className="outline-none">
                        <button className="bg-custom-gradient px-4 py-2 rounded-full w-32 font-bold">
                            Sign in
                        </button>
                    </Link>
                    <Link href="/auth/signup" className="outline-none">
                        <button className="bg-custom-gradient px-4 py-2 rounded-full w-32 font-bold">
                            Sign up
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Name
