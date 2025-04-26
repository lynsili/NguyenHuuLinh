import React from "react";

const AboutPagea = () => {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Chào mừng đến với <span className="text-orange-500">LynFood</span>
        </h1>
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md 
                hover:bg-orange-600 transition duration-300"
        >
          Khám phá ngay
        </button>
      </div>
    </div>
  );
};

export default AboutPagea;
