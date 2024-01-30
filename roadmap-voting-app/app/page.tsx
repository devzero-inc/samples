import Topbar from "@/components/Topbar";
import Post from "@/components/Post";

export default function Home() {
  return (
    <div className=" w-[50%] flex flex-col gap-1 mb-4">
      <Topbar />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) =>
      (
        <Post key={item} />
      ))
      }
    </div>
  );
}
