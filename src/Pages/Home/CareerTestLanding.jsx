import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import careerImg from '../../assets/images/vr2.png'; // ✅ Ensure this image exists

const CareerTestLanding = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/career/test');
  };

  return (
    <section className="py-24 bg-white" id="career-test">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-xl p-10 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Your tech journey starts here.
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join TechTalents City and access the Career Test to discover your ideal path in tech based on your strengths and interests.
          </p>
          <div className="relative h-[32rem] overflow-hidden rounded-xl group">
            <img 
              src={careerImg} 
              alt="Career Test" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-center items-center text-white p-8">
              <h4 className="mt-4 text-2xl font-bold text-center">Take the Career Test</h4>
              <p className="text-lg mt-3 bg-black/40 px-4 py-2 rounded-lg">Just 5 minutes to get started</p>
              <Button 
                type="primary"
                className="mt-8 py-5 px-12 font-bold text-lg"
                onClick={handleClick}
              >
                Access Career Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTestLanding;
