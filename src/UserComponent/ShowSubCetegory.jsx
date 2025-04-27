import React from 'react';

function ShowSubCetegory({ subcategories }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {subcategories.map((sub) => (
        <div key={sub._id} className="bg-white rounded-xl shadow p-4">
          <img
            src={sub.image}
            alt={sub.name}
            className="h-40 w-full object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold">{sub.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default ShowSubCetegory;