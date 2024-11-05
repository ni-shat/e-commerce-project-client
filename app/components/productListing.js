'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://api.escuelajs.co/api/v1/products");
                const data = await response.json();

                // Take only the first 100 products
                const limitedData = data.slice(0, 20);

                setProducts(limitedData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        }
        fetchProducts();
    }, []);

    console.log(products);

    if (loading) return <div className="text-center p-4">Loading...</div>;

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

                    return (
                        <div
                            key={product.id}
                            className="mb-4 rounded-lg transition-shadow duration-200"
                        >
                            <div className="relative group overflow-hidden"> {/* Added overflow-hidden here */}
                                {firstImageUrl && (
                                    <Image
                                        src={firstImageUrl}
                                        alt={product.title}
                                        width={300}
                                        height={300}
                                        className="h-[300px] w-full object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-1000" 
                                    />
                                )}
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                <button
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white hover:bg-yellow-600 text-black px-8 py-2 text-nowrap rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold w-[70%]"
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <h2 className="text-base font-semibold text-gray-900 mt-2 hover:text-yellow-500 hover:cursor-pointer duration-500">{product.title}</h2>
                            <p className="text-lg font-bold text-yellow-600">${product.price}</p>
                        </div>
                    );
                })}
            </div>
        </main>


    );
}
