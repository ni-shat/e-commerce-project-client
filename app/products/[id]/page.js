// app/products/[id]/page.js

'use client'; // Add 'use client' at the top to make this a Client Component

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Image from 'next/image';
import { fetchOneProduct } from '@/lib/fetchOneProduct';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function ProductDetails({ params }) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await fetchOneProduct(params.id); // Fetch data by product ID
            setProduct(data);
        };

        fetchProduct();
    }, [params.id]);

    // Function to increase quantity
    const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);

    // Function to decrease quantity (not less than 1)
    const decreaseQuantity = () => setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

    // Function to handle add to cart logic
    const handleAddToCart = () => {
        console.log(`Added ${quantity} item(s) to the cart.`);
    };

    if (!product) {
        return <div>Loading...</div>; // Display loading state until the product is fetched
    }

    return (
        <div>
            <Header />
            <div className="p-4 lg:p-8 lg:w-[80%] mx-auto bg-white">
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center justify-center">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="rounded-lg border"
                    />
                    <div className="ml-0 lg:ml-6 mt-4 lg:mt-0">
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                        <p className="text-lg font-bold text-yellow-600">${product.price.toFixed(2)}</p>
                        {product.discountPercentage > 0 && (
                            <p className="text-sm text-gray-500 line-through">
                                ${(
                                    product.price + (product.price * product.discountPercentage) / 100
                                ).toFixed(2)}
                            </p>
                        )}
                        <p className="text-md mt-2">{product.description}</p>

                        <div className='flex gap-4 my-6'>
                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-2">
                                <div className='bg-white border border-gray-950 rounded-full font-bold flex justify-center items-center'>
                                   
                                    <FaMinus  className="mx-3 text-xs flex hover:cursor-pointer"
                                        onClick={decreaseQuantity} />
                                   
                                    <p className="w-12 text-center  rounded-md py-2">{quantity}</p>
                                    {/* <button
                                        className=" text-gray-700 p-2 hover:bg-gray-400"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button> */}

                                    <FaPlus  className="mx-3 text-xs flex hover:cursor-pointer"
                                        onClick={increaseQuantity} />
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="bg-yellow-500 text-white py-2 px-7 rounded-3xl hover:bg-yellow-600 uppercase font-semibold text-sm"
                            >
                                Add to Cart
                            </button>
                        </div>

                        <p className="mt-4">
                            <strong>Category:</strong> {product.category}
                        </p>
                        <p className="mt-2">
                            <strong>Stock:</strong> {product.stock}
                        </p>
                        <p className="mt-2">
                            <strong>Brand:</strong> {product.brand}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Reviews:</h2>
                    {product.reviews.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {product.reviews.map((review, index) => (
                                <li key={index}>
                                    <strong>{review.reviewerName}:</strong> {review.comment}{" "}
                                    <span className="text-yellow-600">({review.rating} stars)</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
