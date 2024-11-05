'use client';

import { fetchProducts } from "@/lib/fetchProducts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";

export default function ProductListing() {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchProducts() {
    //         try {
    //             const response = await fetch("https://dummyjson.com/products");
    //             const data = await response.json();

    //             // Take only the first 100 products
    //             const limitedData = data.products.slice(0, 20);

    //             setProducts(limitedData);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Failed to fetch products:", error);
    //         }
    //     }
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        async function getProducts() {
            const products = await fetchProducts();
            setProducts(products);
            // setLoading(false);
        }
        getProducts();
    }, []);

    console.log(products);

    // if (loading) return <div className="text-center p-4">Loading...</div>;

    return (
        <main className="p-4 lg:p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Product Listing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
                {products.map((product) => {
                    let firstImageUrl = '';
                    if (product.images && product.images.length > 0) {
                        firstImageUrl = product.images[0]
                            .replace(/^\[\"/, '') // Remove starting ["
                            .replace(/\"$/, '');  // Remove ending "]
                    }
                    const roundedDiscountPercentage = Math.round(product.discountPercentage);
                    const discountedPrice =
                        product.price - product.price * (roundedDiscountPercentage / 100).toFixed(2);

                    return (
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <div
                                className="mb-4 border rounded-lg shadow-md transition-shadow duration-200"
                            >
                                <div className="relative group overflow-hidden"> {/* Added overflow-hidden here */}
                                    {/* {firstImageUrl && ( */}
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        width={300}
                                        height={300}
                                        className="h-[300px] w-full object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    {/* )} */}
                                    <div className="absolute inset-0 bg-[#222222] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                    <button
                                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white hover:bg-[#222222] text-black hover:text-white px-6 py-2 text-nowrap rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 font-semibold w-[70%] flex gap-2 justify-center"
                                    >
                                      <FaShoppingCart className="mt-0.5" />  Add to Cart
                                    </button>
                                    {
                                        Math.round(product.discountPercentage) > 0
                                        && <p className="absolute py-1 px-3 bg-yellow-500 text-white top-2 right-2 text-xs group-hover:hidden">-{Math.round(product.discountPercentage)}%</p>
                                    }
                                </div>
                                <Link href={`/products/${product.id}`}>
                                    <h2 className="text-base font-semibold text-gray-900 mt-2 hover:text-yellow-500 hover:cursor-pointer duration-500 px-4 text-center pt-2 pb-1">{product.title}</h2>
                                </Link>
                                {/* <p className=" font-normal text-sm text-gray-700 px-4 text-center pb-3">${product.price}</p> */}

                                {
                                    Math.round(product.discountPercentage) ?
                                        <div className="flex gap-4 justify-center items-center px-4 pb-3">
                                            <p className=" font-normal text-sm text-gray-700 line-through">${product.price}</p>
                                            <p className=" font-normal text-sm text-red-700">${discountedPrice.toFixed(2)}</p>
                                        </div>
                                        :
                                        <p className=" font-normal text-sm text-gray-700 px-4 text-center pb-3">${product.price}</p>
                                }
                            </div>
                        </Link>

                    );
                })}
            </div>
        </main>


    );
}
