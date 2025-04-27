import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, resetCategoryState } from '../Redux_toolkit/Cetegory.slice';
// import { useNavigate } from 'react-router-dom';

function Category() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const { loading, error, success,  } = useSelector((state) => state.category);

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  // const gotodashboard =()=>{
  //   navigate('/addcetegory')
  //   window.location.reload()
  // }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Name and Image are required");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    dispatch(createCategory(formData));

    // Optional: Reset form
    setName('');
    setImage(null);
    setTimeout(() => dispatch(resetCategoryState()), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Electronics"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            className="w-full"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
          
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
      </form>

      {success && (
        <p className="mt-4 text-green-600 text-center">✅ Category created successfully!</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 text-center">❌ {error}</p>
      )}
    </div>
  );
}

export default Category;
