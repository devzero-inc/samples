"use client";

import Image from "next/image";

const ImageContainer = ({img}) => {
    return (
        <div className=" col-span-1 row-span-1 h-full w-full">
            <Image 
                src={img}
                alt="Devzero"
                style={{objectFit: "cover", borderRadius: "0.5rem", height: "100%", width: "100%"}}
                width={400}
                height={400}
            />
        </div>
    )
}

export default ImageContainer
