import Image from "next/image"
import Link from "next/link"
import Name from "@/components/Name";

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
                        priority
                    />
                </Link>
                <div>
                    <h1 className=" text-3xl tracking-wide font-bold">DevZero</h1>
                    <p className=" text-sm text-gray-400">Roadmap voting app</p>
                </div>
            </div>
            <Name/>
        </div>
    )
}

export default Navbar
