import Link from "next/link";

const Signup = () => {
    return (
        <div className=" bg-cusSec border border-cusBorder flex-1 w-[50%] mb-5 rounded-lg text-white p-4 flex flex-col items-center justify-around">
            <h1 className=" text-6xl font-bold bg-clip-text text-transparent bg-custom-gradient p-2">Sign In</h1>
            <form className="flex flex-col gap-4">
                <input className=" px-4 py-3 rounded-lg bg-cusInput outline-none" type="email" placeholder="Enter your email"/>
                <input className=" px-4 py-3 rounded-lg bg-cusInput outline-none" type="password" placeholder="Enter your password"/>
                <Link href="/auth/signup" className="outline-none text-center">
                    Don't have an account? <span className="bg-clip-text text-transparent bg-custom-gradient">Signup</span>
                </Link>
                <button className=" bg-custom-gradient px-4 py-3 rounded-lg outline-none">
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Signup
