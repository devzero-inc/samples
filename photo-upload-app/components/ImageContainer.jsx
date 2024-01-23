"use client";

import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';

const ImageContainer = ({ img, images, setImages }) => {

    const handleDelete = async () => {
        await fetch(`/api/deleteimage?name=${img.name}`, {
            method: 'POST',
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                const filteredImages = images.filter(image => !(image.name && image.name === img.name));
                setImages(filteredImages);
                console.log(res);

            }).catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="col-span-1 row-span-1 h-full w-full relative group">
            <Image
                src={img.name ? img.path : img}
                alt="Devzero"
                className="object-cover rounded-md w-full h-full"
                width={400}
                height={400}
                priority
            />
            {img.name &&
                <DeleteIcon
                    className=" transition-all absolute bottom-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={handleDelete}
                />
            }
        </div>

    )
}

export default ImageContainer
