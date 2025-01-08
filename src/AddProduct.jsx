import { IconButton } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [products, setProducts] = useState([]);

    const addProduct = async (product) => {
        const result = await axios.post('https://dummyjson.com/products/add', product);
        return result.data;
    }

    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: (data) => {
            setProductName('');
            setProductPrice('');
            setProducts((prevProducts) => [...prevProducts, data]);
            toast.success('Product added successfully!', {
                position: 'bottom-right',
            });
        },
        onError: () => {
            toast.error('An error occurred while adding the product!', {
                position: 'bottom-right',
            });
        }
    }
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productName === '' || productPrice === '') {
            toast.error('Please fill in all fields!', {
                position: 'bottom-right',
            });
            return;
        }
        const product = {
            title: productName,
            price: productPrice,
        };
        mutation.mutate(product);
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Price:</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {mutation.isPending ? "Adding Product..." : "Add Product"}
                </button>
            </form>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div className="group relative p-4 bg-white rounded-3xl border-2 ">
                                <div className="flex justify-between items-center space-x-1">
                                    <h3 className="text-sm text-gray-700">
                                        {product.title}
                                    </h3>
                                    <div className='flex space-x-2'>
                                        <p className="text-sm font-medium text-gray-900">${product.price}</p>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;