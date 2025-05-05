// src/Pages/Home/CareerTestLanding.jsx

import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import careerImg from '../../assets/images/vr2.png';

const CareerTestLanding = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/career/test'); // Route to test page
  };

  return (
    <section className="py-24 bg-white" id="career-test">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-xl p-10 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Know Your Career Path in Tech</h3>
          <p className="text-xl text-gray-600 mb-8">
            To help you navigate your career path toward tech and discover the right project for you, take our career test now.
          </p>
          <div className="relative h-[32rem] overflow-hidden rounded-xl group">
            <img 
              src={careerImg} 
              alt="Career Test" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-center items-center text-white p-8">
              <h4 className="mt-4 text-2xl font-bold text-center">Find Your Best-Fit Tech Role</h4>
              <p className="text-lg mt-3 bg-black/40 px-4 py-2 rounded-lg">Career Test: 5 minutes</p>
              <Button 
                type="primary"
                className="mt-8 py-5 px-12 font-bold text-lg"
                onClick={handleClick}
              >
                Take Career Test Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTestLanding;
