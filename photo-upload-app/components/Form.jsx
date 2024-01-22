"use client";

import { useState } from "react";
import Image from "next/image";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const Form = () => {

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('file', file);

        await fetch('/api/upload', {
            method: 'POST',
            body: data
        })
            .then(res =>{
                if(res.ok){
                    alert('File uploaded successfully!');
                    setFile(null);
                }
                return res.json()
            } )
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className=" bg-purple-700 p-4 row-span-2 col-span-1 rounded-lg flex flex-col justify-between items-center gap-4">
            <div className=" flex flex-col items-center gap-5">
                <div className="flex items-center gap-2 pr-3">
                    <Image
                        src="/assets/devzero_logo.png"
                        alt="Devzero"
                        width={75}
                        height={75}
                    />
                    <h1 className=" text-2xl">Devzero</h1>
                </div>
                <h2 className=" text-3xl font-bold">Photo Upload App</h2>
                <p className="text-center">Capture, upload, and share your moments seamlessly with our intuitive photo upload app, where memories meet the cloud.</p>
            </div>
            <form className=" flex-1 flex flex-col items-center justify-center gap-4 w-full" onSubmit={handleSubmit}>
                <label htmlFor="file"
                    className=" w-full flex flex-col items-center justify-center flex-1 rounded-lg cursor-pointer bg-gray-500 hover:bg-gray-400">
                    <InsertPhotoIcon style={{ fontSize: '5rem' }} />
                    {file && <p>{file.name}</p>}
                </label>
                <input className="w-full hidden" type="file" id='file' name="file" onChange={e => setFile(e.target.files[0])} required />
                <button type="submit" className=" bg-red-400 w-full p-2 rounded-lg hover:bg-red-300">
                    Upload
                </button>
            </form>
        </div>
    )
}

export default Form
