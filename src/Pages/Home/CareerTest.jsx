import React from 'react';
import careerImg from '../assets/vr2.png'; // ✅ You can rename the image file later if you want

const CareerTest = () => {
  return (
    <section className="py-24 bg-white" id="career-test">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-xl p-10 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Know Your Career Path in Tech</h3>
          <p className="text-xl text-gray-600 mb-8">
            Discover the right project for you and take our career test to start your journey.
          </p>
          <div className="relative h-[32rem] overflow-hidden rounded-xl group">
            <img 
              src={careerImg} 
              alt="Career Test" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-center items-center text-white p-8">
              <div className="text-7xl mb-6 transition-transform hover:scale-110">
                <div className="bg-white/30 rounded-full p-4 backdrop-blur-md border-2 border-white/20">
                  🎯
                </div>
              </div>
              <h4 className="mt-4 text-2xl font-bold text-center">Find Your Best-Fit Tech Role</h4>
              <p className="text-lg mt-3 bg-black/40 px-4 py-2 rounded-lg">Career Test: 5 minutes</p>
              <button className="mt-8 bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors">
                Take Career Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTest;
