"use client";

import Topbar from "@/components/Topbar";
import Post from "@/components/Post";
import { useEffect, useState } from "react";

interface post {
  id: string,
  title: string,
  description: string,
  status: string,
  target: string,
  createdAt: string,
  updatedAt: string,
}

export default function Home() {

  const [posts, setPosts] = useState<post[]>();

  useEffect(() => {

    fetch("/api/post")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPosts(data.posts);
      })
      .catch((err) => console.log(err));

  }, [])

  return (
    <div className=" w-[50%] flex flex-col gap-1 mb-4">
      <Topbar />

      {posts && posts.map((ele: post): JSX.Element => (
        <Post key={ele.id} id={ele.id} title={ele.title} description={ele.description} status={ele.status} target={ele.target} />
      ))}

    </div>
  );
}
