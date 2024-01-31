"use client";

import { useEffect, useState } from "react";
import Form from "@components/Form";
import Confirm from "@components/Confirm";
import sampleImages from "@public/assets/sample-images/exo";
import ImageContainer from "@components/ImageContainer";
import { getPhoto, fetchImageData } from "@http/api";

async function fetchAllImages(imageInfo) {
  const newImageArray = [];

  for(let i = 0; i < imageInfo.length; i++){
    if(!imageInfo[i].id) continue;
    const imageData = await fetchImageData(imageInfo[i].id);
    const newImageData = { ...imageInfo[i], url: imageData };
    if (imageData) {
      newImageArray.push(newImageData);
    }
  }

  return newImageArray;
}

const Page = () => {

  const [images, setImages] = useState(sampleImages);
  const [imageInfo, setImageInfo] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {

    getPhoto()
      .then((data) => {
        let arr = [];
        data.forEach((item) => {
          const newPath = item.path.replace('public', '').replace(/\\/g, '/');
          const name = item.name;
          arr.push({ id: item.id, name: name, path: newPath });
        });
        setImageInfo([...arr, ...sampleImages]);
      })
      .catch((error) => console.log(error));
  }, []);



  useEffect(() => {
    if (imageInfo.length == 0) return;
    fetchAllImages(imageInfo).then(newImageArray => {
      setImages([...newImageArray, ...sampleImages]);
    });
  }, [imageInfo]);

  return (
    <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:auto-rows-auto sm:grid-flow-row-dense gap-4 p-4 h-screen overflow-auto relative">
      <Form setImages={setImages} setUploaded={setUploaded} />
      <Confirm uploaded={uploaded} />
      {images && images.map((item, id) => (
        <ImageContainer exp={(((id + 1) % 7 == 0) || (id + 1 == 3)) ? true : false} img={item} key={id} images={images} setImages={setImages} />
      ))}
    </div>
  )
}

export default Page
