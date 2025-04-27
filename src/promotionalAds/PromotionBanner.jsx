import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

const PromotionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 mt-6 to-indigo-600 text-white p-8 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <FaRocket className="text-yellow-400" /> Boost Your Business with Us!
        </h2>
        <p className="text-md">Partner with <span className="font-bold text-yellow-300">BrainStation</span> to scale faster and smarter.</p>
      </div>
      <Link
        to="/contact"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full transition-all"
      >
        Get Started 🚀
      </Link>
    </div>
  );
};

export default PromotionBanner;
