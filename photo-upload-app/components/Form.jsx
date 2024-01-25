"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadPhoto } from "@http/api";

const Form = ({ setImages, setUploaded }) => {

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('file', file);

        const result = await uploadPhoto(data);

        if (result) {
            const uploadedImageUrl = URL.createObjectURL(file);
            setImages(prevImages => [uploadedImageUrl, ...prevImages]);
            setUploaded(true);
            setTimeout(() => {
                setUploaded(false);
            }, 1000);
            setFile(null);
        }

        // await fetch('/api/image', {
        //     method: 'POST',
        //     body: data
        // })
        //     .then(res => {
        //         if (res.ok) {
        //             const uploadedImageUrl = URL.createObjectURL(file);
        //             setImages(prevImages => [uploadedImageUrl, ...prevImages]);
        //             setUploaded(true);
        //             setTimeout(() => {
        //                 setUploaded(false);
        //             }, 1000);
        //             setFile(null);
        //         }
        //         else {
        //             alert('Upload failed. Please try again.');
        //         }
        //         return res.json()
        //     })
        //     .then(res => {
        //         console.log(res);
        //     }).catch(error => {
        //         console.error('Error:', error);
        //     });
    }

    return (

        <div className=" border-[0.2rem] border-gradient-from p-4 row-span-2 col-span-1 rounded-[0.5rem] flex flex-col justify-between items-center gap-4 text-white">
            <div className=" flex flex-col items-center gap-5">
                <div className="flex items-center gap-2 pr-3">
                    <Image
                        src="/assets/logos/devzero_logo.png"
                        alt="Devzero"
                        width={75}
                        height={75}
                    />
                    <h1 className=" text-2xl font-semibold">Devzero</h1>
                </div>
                <div className="text-center">
                    <h2 className=" text-3xl font-bold mb-2">Photo Upload App</h2>
                    <p className="text-center text-sm text-gray-300">Capture, upload, and share your moments seamlessly with our intuitive photo upload app, where memories meet the cloud.</p>
                </div>
            </div>
            <form className=" flex-1 flex flex-col items-center justify-end gap-4 w-full" onSubmit={handleSubmit}>
                <label htmlFor="file"
                    className=" w-full flex flex-col items-center justify-center flex-1 mt-4 rounded-lg cursor-pointer bg-gradient-to-r from-gradient-from to-gradient-to hover:opacity-90 p-1">
                    <Image
                        src="/assets/logos/upload.png"
                        alt="Upload"
                        width={75}
                        height={75}
                        style={{ filter: 'invert(1)' }}
                    />
                    {!file && <p className="text-center">Click to upload a picture</p>}
                    {file && <p className="text-center">{file.name}</p>}
                </label>
                <input className="w-full hidden" type="file" id='file' name="file" onChange={e => setFile(e.target.files[0])} required />
                <button type="submit" className=" w-full p-2 rounded-lg bg-gradient-to-r from-gradient-from to-gradient-to hover:opacity-90">
                    Upload
                </button>
            </form>
        </div>
    )
}

export default Form
