import Form from "@components/Form";
import ImageContainer from "@components/ImageContainer";

const page = () => {
  return (
    <div className=" grid grid-cols-4 gap-4 p-4 h-screen overflow-y-auto">
      <Form/>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <ImageContainer img={item} key={item}/>
      ))}
    </div>
  )
}

export default page
