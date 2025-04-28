import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus } from 'react-icons/fa';
import { IoMdPricetags } from 'react-icons/io';
import { getallproduct } from '../Redux_toolkit/productSlice';
import { addToCart } from '../Redux_toolkit/cart'; // ✅ Import addToCart thunk
import PromotionBanner from '../promotionalAds/PromotionBanner';

const ShowProduct = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  const { loading: cartLoading } = useSelector((state) => state.cart); // ✅ To show cart loading if needed

  useEffect(() => {
    dispatch(getallproduct());
  }, [dispatch]);

  const products = data?.data || []; // ✅ Array of products

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  return (
    <>
      <PromotionBanner />
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">🛒 Featured Products</h2>

        {loading && <p className="text-center text-blue-500">Loading products...</p>}
        {error && <p className="text-center text-red-500">❌ {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-2xl p-4 shadow hover:shadow-xl transition-all duration-300">
              <img
                src={product.image[0]}
                alt={product.name}
                className="h-48 w-full object-cover rounded-xl mb-4"
              />

              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {product.description?.slice(0, 50)}...
              </p>

              <div className="flex items-center gap-2 mb-2">
                <IoMdPricetags className="text-green-600" />
                <p className="text-base font-bold text-green-700">
                  ৳ {product.price - (product.price * product.discount) / 100}
                  <span className="text-sm text-gray-400  ml-2">{product.unit}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">৳ {product.price}</span>
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2">Stock: {product.stock}</p>

              <div className="flex items-center justify-between">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {product.discount}% Off
                </span>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-all"
                  disabled={cartLoading} // ✅ Disable if cart is loading
                >
                  <FaCartPlus /> {cartLoading ? "Adding..." : "Add to Cart" }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
