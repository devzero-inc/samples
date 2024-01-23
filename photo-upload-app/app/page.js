"use client";

import { useEffect, useState } from "react";
import Form from "@components/Form";
import sampleImages from "@public/assets/sample-images/exo";
import ImageContainer from "@components/ImageContainer";

const page = () => {

  const [images, setImages] = useState(sampleImages);

  useEffect(() => {
    fetch("/api/getimage")
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.forEach((item) => {
          const newPath = item.path.replace('public', '').replace(/\\/g, '/');
          const name = item.name;
          arr.push({ name: name, path: newPath });
        });
        console.log(arr);
        setImages([...arr, ...sampleImages]);
      });
  }, []);

  return (
    <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4 h-screen overflow-auto">
      <Form setImages={setImages}/>

      {images && images.map((item, id) => (
        <ImageContainer img={item} key={id} images={images} setImages={setImages}/>
      ))}
    </div>
  )
}

export default page
