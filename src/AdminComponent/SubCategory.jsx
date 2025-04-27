import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubCategory, resetSubCategoryState } from '../Redux_toolkit/subCategorySlice';
import { getcategory } from '../Redux_toolkit/Cetegory.slice';

function SubCategory() {
  const dispatch = useDispatch();

  // Updated selectors with fallback
  const { loading, error, success } = useSelector((state) => state.subCategory);
  const category = useSelector((state) => state.category.category) || [];

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');

  // Fetch all categories for dropdown
  useEffect(() => {
    dispatch(getcategory());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image || !categoryId) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('category', categoryId);

    dispatch(createSubCategory(formData));
    setName('');
    setImage(null);
    setCategoryId('');

    setTimeout(() => dispatch(resetSubCategoryState()), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Add SubCategory</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">SubCategory Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mobile Phones"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Category</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={category.length === 0}
          >
            <option value="">-- Select Category --</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create SubCategory'}
        </button>

        {success && (
          <p className="text-green-600 text-center mt-2">
            ✅ SubCategory created successfully!
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mt-2">❌ {error}</p>
        )}
      </form>
    </div>
  );
}

export default SubCategory;
