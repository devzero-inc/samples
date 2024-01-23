"use client";

import { useState } from "react";
import Form from "@components/Form";
import sampleImages from "@public/assets/sample-images/exo";
import ImageContainer from "@components/ImageContainer";

const page = () => {

  const [images, setImages] = useState(sampleImages);

  return (
    <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4 h-screen overflow-auto">
      <Form setImages={setImages}/>

      {images && images.map((item, id) => (
        <ImageContainer img={item} key={id} />
      ))}
    </div>
  )
}

export default page
