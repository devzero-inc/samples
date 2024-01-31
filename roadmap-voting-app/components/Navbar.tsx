import Image from "next/image"
import Link from "next/link"
import Name from "@/components/Name";

const Navbar = () => {


    
    return (
        <div className="bg-cusSec w-[50%] text-white flex items-center justify-between mt-5 p-2 rounded-lg">
            <div className="flex items-center">
                <Link href="/" className="outline-none">
                    <Image
                        src="/assets/logos/devzero_logo.png"
                        alt="Devzero"
                        width={75}
                        height={75}
                        priority
                    />
                </Link>
                <div>
                    <h1 className=" hidden sm:block text-lg sm:text-2xl md:text-3xl tracking-wide font-bold">DevZero</h1>
                    <p className=" hidden sm:block text-[0.6rem] sm:text-[0.7rem] md:text-sm text-gray-400 text-center">Roadmap voting app</p>
                </div>
            </div>
            <Name/>
        </div>
    )
}

export default Navbar
