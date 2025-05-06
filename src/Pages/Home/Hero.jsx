// Updated Hero.jsx with search functionality
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/images/heroImage.png';
import Container from '../../components/Container';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        navigate(`/projects/search?query=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Container className="flex flex-col justify-center items-center h-screen pb-16 px-4 lg:px-20 xl:px-32">
        <div className='text-center max-w-3xl'>
          <p className="font-bold pt-12 sm:mt-0 text-4xl md:text-7xl">
            <span className='text-[#E8B300]'>Ascend</span>{' '}
            <span className='text-[#E73015]'>Achieve</span>{' '}
            <span className='text-[#0559A5]'>Advance</span>
          </p>
          <p className='py-16'>Welcome to TechTalents City, where technology and talent converge to unleash your potential and create endless opportunities</p>
          <div className='w-full rounded-xl shadow-md bg-white/80 flex justify-between items-center py-4 px-5'>
            <input
              type="text"
              placeholder="Search Projects"
              className="w-full bg-transparent text-black/50 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div 
              className="bg-black w-10 h-10 rounded-full p-3 flex justify-center items-center cursor-pointer"
              onClick={handleSearch}
            >
              <IoIosSearch size={24} color='white' />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
