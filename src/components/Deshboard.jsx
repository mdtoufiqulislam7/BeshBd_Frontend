import React from 'react';
import { FaUserCircle, FaListAlt, FaTags, FaThLarge } from 'react-icons/fa';
import ShowProduct from '../UserComponent/ShowProduct';
import { useNavigate } from 'react-router-dom';


const Deshboard = () => {
  const navigate = useNavigate()

  const gotoprofile =()=>{
      navigate('/userprofile')

  }
  const gotocategory =()=>{
    navigate('/showcategory')

}

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sticky Sidebar */}
      <div className="w-1/5 bg-white shadow-lg p-6 hidden sm:block sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-700">Dashboard Menu</h2>
        <ul className="space-y-4 text-gray-600 mb-8">
          <li onClick={gotoprofile}  className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <FaUserCircle /> Profile
          </li>
          <li onClick={gotocategory} className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <FaThLarge /> Category
          </li>
          {/* <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <FaTags /> Subcategory
          </li> */}
          <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <FaListAlt /> Orders
          </li>
        </ul>

        {/* Sponsored Ads */}
        <div className="border-t pt-4">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Sponsored</h3>

          {/* Prothom Alo Ad */}
          <div className="bg-gray-50 p-3 rounded-lg mb-4 shadow-sm hover:shadow-md transition">
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/9d6b6c150694781.Y3JvcCwxMTY4LDkxNCwyNjAsMA.png"
              alt="Prothom Alo"
              className="w-28 mb-2"
            />
            <p className="text-sm text-gray-600">
              Get the latest Bangladeshi news at your fingertips. Trusted by millions daily!
            </p>
            <a
              href="https://www.prothomalo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-500 text-sm hover:underline"
            >
              Visit Prothom Alo →
            </a>
          </div>

          {/* ChatGPT Ad */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="ChatGPT Co."
              className="w-24 mb-2"
            />
            <p className="text-sm text-gray-600">
              Automate your business with AI. Try ChatGPT Pro tools for smart customer support.
            </p>
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-500 text-sm hover:underline"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8">
        {/* Eid Offer Banner */}
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden mb-10 flex flex-col md:flex-row items-center p-6 md:p-8">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              🕌 Eid Ul Adha 2025 Mega Offer!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Celebrate with <span className="text-red-600 font-bold">25% OFF</span> on your favorite groceries & essentials. Limited time only!
            </p>
            <button className="bg-red-500 text-white px-5 py-3 rounded-md hover:bg-red-600 transition-all text-sm font-semibold uppercase">
              Start Shopping
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D10AQGsOJSLrQRfwg/image-shrink_800/image-shrink_800/0/1718880948530?e=2147483647&v=beta&t=A70Ieh1bSIgoQl2_puu94iiu9ntU0L0QiEPVvZmoWpI"
              alt="Eid Offer"
              className="max-w-xs w-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Product Grid Scrollable */}
        <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <ShowProduct />
        </div>
      </div>
    </div>
  );
};

export default Deshboard;
