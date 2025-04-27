// src/components/ShowCategory.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory } from '../Redux_toolkit/Cetegory.slice';
import { useNavigate } from 'react-router-dom';

const ShowCetegory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { category, loading } = useSelector((state) => state.category);
  const gotocategorybyproduct =(id)=>{
    navigate(`/showcategory/${id}`)
    window.location.reload()
  }
  useEffect(() => {
    dispatch(getcategory());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Explore Categories</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category?.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col items-center border rounded-xl p-4 shadow hover:shadow-md transition duration-300 bg-white"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <button className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                {cat.name}
              </button>
              <button onClick={() => gotocategorybyproduct(cat._id)} className="text-lg font-semibold text-white hover:text-blue-600 transition border rounded-4xl p-5 bg-red-900">
                Showing Details 
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCetegory;
