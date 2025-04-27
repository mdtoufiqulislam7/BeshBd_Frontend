// AddProduct.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, resetProductState } from '../Redux_toolkit/productSlice';
import { getcategory } from '../Redux_toolkit/Cetegory.slice';
import { getSubCategoryByCategoryId } from '../Redux_toolkit/subCategorySlice';

const AddProduct = () => {
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);
  const subCategoryState = useSelector((state) => state.subCategory);
  const { loading, success, error } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    name: '',
    category: '',
    subCategory: '',
    unit: '',
    stock: '',
    price: '',
    discount: '',
    description: '',
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getcategory());
  }, [dispatch]);

  useEffect(() => {
    if (form.category) {
      dispatch(getSubCategoryByCategoryId(form.category));
    }
  }, [form.category, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subCategory: '' }), // only reset subCategory when category changes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, category, subCategory, unit, price, description } = form;
    if (!name || !category || !subCategory || !unit || !price || !description || !image) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    formData.append('image', image);

    dispatch(createProduct(formData));
    setTimeout(() => dispatch(resetProductState()), 3000);

    setForm({
      name: '',
      category: '',
      subCategory: '',
      unit: '',
      stock: '',
      price: '',
      discount: '',
      description: '',
    });
    setImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" />

        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          {category?.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <select
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={!subCategoryState.list.length}
        >
          <option value="">Select SubCategory</option>
          {subCategoryState.list?.map((sub) => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))}
        </select>

        <input type="text" name="unit" value={form.unit} onChange={handleChange} placeholder="Unit (e.g., pcs, kg)" className="w-full p-2 border rounded" />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
        <input type="number" name="discount" value={form.discount} onChange={handleChange} placeholder="Discount (%)" className="w-full p-2 border rounded" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product Description" className="w-full p-2 border rounded" />

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Creating Product...' : 'Create Product'}
        </button>

        {success && <p className="text-green-600 text-center">✅ Product created successfully!</p>}
        {error && <p className="text-red-600 text-center">❌ {error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
