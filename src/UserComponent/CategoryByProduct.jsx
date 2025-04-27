import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  getProductByCategory } from '../Redux_toolkit/productSlice';
import { FaCartPlus } from 'react-icons/fa';
import { IoPricetagsOutline } from 'react-icons/io5';
import { addToCart } from '../Redux_toolkit/cart';

const CategoryByProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getProductByCategory(id));
    }
  }, [dispatch, id]);
  
    const handleAddToCart = (productId) => {
      dispatch(addToCart(productId));
    };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">🛍️ Products by Category</h2>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">❌ {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="h-48 w-full object-cover rounded-t-2xl"
            />

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mb-2">
                  <IoPricetagsOutline className="text-green-600" size={20} />
                  <p className="text-base font-semibold text-green-700">
                    ৳ {product.price - (product.price * product.discount) / 100}
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ৳ {product.price}
                    </span>
                  </p>
                </div>

                <p className="text-xs text-gray-600">Stock Available: {product.stock}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {product.discount}% OFF
                </span>

                <button onClick={() => handleAddToCart(product._id)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition-all">
                  <FaCartPlus /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryByProduct;
