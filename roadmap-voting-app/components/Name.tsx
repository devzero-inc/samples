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
                <div className="flex gap-4 items-center px-4 text-md sm:text-xl md:text-2xl font-semibold text-center">{name}</div>
                :
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center px-4">

                    <Link href="/auth/signin" className="outline-none">
                        <button className="bg-custom-gradient text-sm md:text-md lg:text-lg px-2 py-1 lg:px-4 lg:py-2 rounded-full w-24 lg:w-32 lg:font-bold">
                            Sign in
                        </button>
                    </Link>
                    <Link href="/auth/signup" className="outline-none">
                        <button className="bg-custom-gradient text-sm md:text-md lg:text-lg px-2 py-1 lg:px-4 lg:py-2 rounded-full w-24 lg:w-32 lg:font-bold">
                            Sign up
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Name
