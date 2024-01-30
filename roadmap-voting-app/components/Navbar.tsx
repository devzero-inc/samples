import Image from "next/image"
import Link from "next/link"

const Navbar = () => {



    return (
        <div className="bg-cusSec border-cusBorder border w-[50%] text-white flex items-center justify-between mt-5 p-2 rounded-lg">
            <div className="flex items-center">
                <Link href="/" className="outline-none">
                    <Image
                        src="/assets/logos/devzero_logo.png"
                        alt="Devzero"
                        width={75}
                        height={75}
                    />
                </Link>
                <div>
                    <h1 className=" text-3xl tracking-wide font-bold">DevZero</h1>
                    <p className=" text-sm text-gray-400">Roadmap voting app</p>
                </div>
            </div>
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
        </div>
    )
}

export default Navbar
