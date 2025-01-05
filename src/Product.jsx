import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router';
import { Rating } from "@material-tailwind/react";

const Product = () => {
    const params = useParams();
    const fetchProduct = async () => {
        const result = await axios.get(`https://dummyjson.com/products/${params.id}`);
        return result.data;
    }
    const { isPending, error, isError, data: product } = useQuery({
        queryKey: ['product', params.id],
        queryFn: fetchProduct,
        staleTime: 10000,
    })
    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error {error.message}</div>
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 ">
                    <div key={product.id} className="group relative p-4 hover:cursor-pointer bg-white rounded-3xl border-2 ">
                        <img
                            alt={product.title}
                            src={product.images[0]}
                            className="aspect-square w-full rounded-md  object-contain lg:aspect-auto lg:h-80"
                        />
                        <div className="my-2 flex justify-between items-center space-x-1">
                            <h3 className="text-sm font-bold text-gray-700">
                                {product.title}
                            </h3>
                            <Rating value={Math.round(product.rating)} readonly />
                            <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-700">{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product