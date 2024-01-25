import Image from "next/image"

const Confirm = ({uploaded}) => {
  return (
    <div className={`${uploaded ? "scale-100" : "scale-0"} absolute bg-gradient-to-r from-gradient-from-2 to-gradient-to-2 p-8 w-[30%] h-[35%] text-white top-[50%] left-[50%] z-10 -translate-x-2/4 -translate-y-2/4 flex flex-col items-center justify-around rounded-3xl border border-gradient-from transition-all`}>
      <p className="text-2xl">File uploaded successfully!</p>
      <Image src={'/assets/logos/done.png'} alt="Done" width={100} height={100}/>
    </div>
  )
}

export default Confirm
