"use client";

import { useState } from "react";

const Topbar = () => {

    const [dropdown, setDropdown] = useState<Boolean>(false);
    const [selected, setSelected] = useState<string>("All");

    return (
        <div className=" bg-cusWhite w-full border border-cusBorderSec px-2 md:px-8 py-4 text-black rounded-tr-lg rounded-tl-lg flex items-center justify-between">
            <div className=" xl:flex hidden items-center gap-4 md:gap-4 lg:gap-8 ">
                <div className=" border-b-4 border-b-cusBorderSec text-center">
                    All
                </div>
                <div className=" text-center text-nowrap overflow-ellipsis">
                    Need feedback
                </div>
                <div className=" text-center">
                    Next
                </div>
                <div className=" text-center text-nowrap">
                    In Progress
                </div>
                <div className=" text-center">
                    Completed
                </div>
            </div>
            <div className=" block xl:hidden relative">
                <button
                    className="text-white bg-cusBorderSec hover:bg-purple-700 focus:outline-none font-medium rounded-lg text-[0.6rem] md:text-sm px-2 md:px-5 py-2.5 text-center inline-flex items-center justify-between w-20 md:w-44"
                    type="button"
                    onClick={() => { setDropdown(!dropdown) }}
                >
                    {selected}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div className={` ${!dropdown ? "hidden" : "absolute"} top-[120%] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-20 md:w-44 dark:bg-gray-700`}>
                    <ul className="py-2 text-[0.6rem] md:text-sm text-gray-700 dark:text-gray-200">
                        <li>
                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                onClick={() => { setSelected("All"); setDropdown(false) }}
                            >
                                All
                            </div>
                        </li>
                        <li>
                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                onClick={() => { setSelected("Need feedback"); setDropdown(false) }}
                            >
                                Need feedback
                            </div>
                        </li>
                        <li>
                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                onClick={() => { setSelected("Next"); setDropdown(false) }}
                            >
                                Next
                            </div>
                        </li>
                        <li>
                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                onClick={() => { setSelected("In Progress"); setDropdown(false) }}
                            >
                                In Progress
                            </div>
                        </li>
                        <li>
                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                onClick={() => { setSelected("Completed"); setDropdown(false) }}
                            >
                                Completed
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className=" text-sm md:text-md text-center">
                Most voted
            </div>
        </div>
    )
}

export default Topbar
