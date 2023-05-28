import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative h-[0] w-1/2 overflow-hidden rounded-md pt-[50%]">
        <Image
          className="absolute left-[0] top-[0] h-full w-full object-cover"
          src="/1.png"
          alt="user-icon"
          width={1000}
          height={1000}
        />
      </div>
      <div className="relative h-[0] w-1/2 overflow-hidden rounded-md pt-[50%]">
        <Image
          className="absolute left-[0] top-[0] h-full w-full object-cover"
          src="/32.webp"
          alt="user-icon"
          width={1000}
          height={1000}
        />
      </div>
      <div className="relative h-[0] w-1/2 overflow-hidden rounded-md pt-[50%]">
        <Image
          className="absolute left-[0] top-[0] h-full w-full object-cover"
          src="/323.jpg"
          alt="user-icon"
          width={1000}
          height={1000}
        />
      </div>
    </>
  );
}
