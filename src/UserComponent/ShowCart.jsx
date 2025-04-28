import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart, deleteFromCart } from '../Redux_toolkit/cart';
import { useNavigate } from 'react-router-dom';

const ShowCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const handleDelete = (cartItemId) => {
    dispatch(deleteFromCart(cartItemId));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-semibold mb-5">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-500">Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 border-b mb-4">
              <img src={item.productId.image} alt={item.productId.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1 ml-4">
                <h4 className="font-semibold text-xl">{item.productId.name}</h4>
                <p className="text-gray-500">Price: ৳{item.productId.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="font-semibold text-lg">Total: ৳{item.productId.price * item.quantity}</p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-xl font-semibold">Total Amount: ৳{totalAmount}</h3>
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCart;
