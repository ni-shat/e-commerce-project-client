import Image from "next/image";
import bg from '@/public/bg.jpg'


export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center h-96 sm:h-[500px] flex"
    // style={{ backgroundImage: 'url("/bg.jpg")' }}  
    >
      <div className=" flex items-center justify-center sm:justify-start p-6 lg:w-1/2">
        <div className="text-center  sm:text-left text-black space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-center">Discover Amazing Products</h1>
          <p className="text-lg sm:text-xl text-center">Quality products at unbeatable prices.</p>
          <div className="flex justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded ">Shop Now</button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:flex justify-center hidden">
        <Image src={bg} alt="Sample" className="rounded-lg shadow-lg w-full lg:w-auto" />
      </div>
    </section>
  );
}
