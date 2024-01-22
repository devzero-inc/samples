import Image from "next/image";

const ImageContainer = () => {
    return (
        <div className=" col-span-1 h-full w-full">
            <Image 
                src="/assets/sample.jpg"
                alt="Devzero"
                style={{objectFit: "contain", borderRadius: "0.5rem"}}
                width={400}
                height={400}
            />
        </div>
    )
}

export default ImageContainer
