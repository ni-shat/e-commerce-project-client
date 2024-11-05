import Image from "next/image";
import Hero from "./components/Hero";
import Header from "./components/Header";
import ProductListing from "./components/productListing";

export default function Home() {
  return (
    <div>
       <Header></Header>
       <Hero></Hero>
       <ProductListing></ProductListing>
    </div>
  );
}
