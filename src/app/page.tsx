import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <div className="sm:w-25 h-screen bg-slate-800"></div>
      <div className="sm:w-[60%] w-full h-screen"></div>
      <div className="sm:w-[300px] h-screen bg-slate-700"></div>
    </div>

  );
}
