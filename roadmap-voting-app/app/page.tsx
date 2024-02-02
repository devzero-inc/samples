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

    fetch("/api/posts", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.posts);
      })
      .catch((err) => console.log(err));

  }, [])

  return (
    <div className=" w-[50%] flex flex-col mb-4">
      <Topbar />

      {posts && posts.map((ele: post, it: number): JSX.Element => (
        <Post
          key={ele.id}
          id={ele.id}
          title={ele.title}
          description={ele.description}
          status={ele.status}
          target={ele.target}
          isLast={it === posts.length - 1 ? true : false}
        />
      ))}

    </div>
  );
}
