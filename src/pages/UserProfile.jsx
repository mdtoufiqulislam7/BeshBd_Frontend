import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserinfo } from '../Redux_toolkit/User.Slice';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, loading, error } = useSelector((state) => state.user);
  

  useEffect(() => {
    dispatch(getuserinfo());
    
  }, [dispatch]);

  const gotoprofile = ()=>{
    navigate('/updateprofile')
  }
  const gotoaddress = ()=>{
    navigate('/updateaddress')
  }

  if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            src={user.avater}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">
              Role: <span className="font-medium">{user.role}</span>
            </p>
            <p className="text-sm text-gray-600">
              Status: <span className="text-green-500 font-medium capitalize">{user.status}</span>
            </p>
          </div>
        </div>

        <hr className="my-6" />

        {/* Info Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Personal Info</h3>
            
            <p><strong>Email Verified:</strong> {user.verify_email ? 'Yes' : 'No'}</p>
            <p><strong>Last Login:</strong> {new Date(user.last_login_date).toLocaleString()}</p>
            <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Activity Info */}
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Activity</h3>
            <p><strong>Addresses:</strong> {user.address_details?.length || 0}</p>
            <p><strong>Cart Items:</strong> {user.shopping_cart?.length || 0}</p>
            <p><strong>Orders:</strong> {user.orderHistory?.length || 0}</p>
          </div>
        </div>

        {/* Address Details */}
        
            {user.address_details.map((address, index) => {
            if (!address) return null;
            return (
                <div key={address._id || index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <p><strong>Address Line:</strong> {address.address_line}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>Pincode:</strong> {address.pincode}</p>
                <p><strong>Country:</strong> {address.country}</p>
                <p><strong>Mobile:</strong> {address.mobile}</p>
                </div>
            );
            })}
     

        {/* Action Buttons */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Settings</h3>
          <div className="space-y-3">
            <button onClick={gotoprofile} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update Profile
            </button>
            <button onClick={gotoaddress}  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update Address
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
