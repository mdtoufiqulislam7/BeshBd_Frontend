import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserinfo, uploadprofileimage, updateUserDetails } from '../Redux_toolkit/User.Slice';
import { useNavigate } from 'react-router-dom';

const UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { user, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });

  useEffect(() => {
    dispatch(getuserinfo());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        mobile: user.mobile || ''
      });
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await dispatch(uploadprofileimage(file));
      dispatch(getuserinfo());
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(formData));
    navigate('/userprofile')
    window.location.reload()
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Your Profile</h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <img
            src={user?.avater || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Update Profile Picture
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
