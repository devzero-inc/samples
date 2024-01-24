"use client";

import { useEffect, useState } from "react";
import Form from "@components/Form";
import Confirm from "@components/Confirm";
import sampleImages from "@public/assets/sample-images/exo";
import ImageContainer from "@components/ImageContainer";
import { getPhoto } from "@http/api";

const page = () => {

  const [images, setImages] = useState(sampleImages);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {

    getPhoto()
      .then((data) => {
        let arr = [];
        data.forEach((item) => {
          const newPath = item.path.replace('public', '').replace(/\\/g, '/');
          const name = item.name;
          arr.push({ id:item.id, name: name, path: newPath });
        });
        console.log(arr);
        setImages([...arr, ...sampleImages]);
      })
      .catch((error) => console.log(error));

    // fetch("/api/image")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let arr = [];
    //     data.forEach((item) => {
    //       const newPath = item.path.replace('public', '').replace(/\\/g, '/');
    //       const name = item.name;
    //       arr.push({ name: name, path: newPath });
    //     });
    //     console.log(arr);
    //     setImages([...arr, ...sampleImages]);
    //   });
  }, []);

  return (
    <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:auto-rows-auto sm:grid-flow-row-dense gap-4 p-4 h-screen overflow-auto relative">
      <Form setImages={setImages} setUploaded={setUploaded}/>
      <Confirm uploaded={uploaded}/>
      {images && images.map((item, id) => (
        <ImageContainer exp={(((id + 1) % 7 == 0) || (id + 1 == 3)) ? true : false} img={item} key={id} images={images} setImages={setImages}/>
      ))}
    </div>
  )
}

export default page
