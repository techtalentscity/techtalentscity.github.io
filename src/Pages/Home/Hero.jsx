import { IoIosSearch } from 'react-icons/io';
import image from '../../assets/images/heroImage.png';
import Container from '../../components/Container';

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Container className="flex flex-col justify-center items-center h-screen pb-16 px-4 lg:px-20 xl:px-32">
        <div className='text-center max-w-3xl'>
          <p className="font-bold pt-12 sm:mt-0 text-4xl md:text-7xl"><span className='text-[#fcd400]'>Ascend</span> <span className='text-[#ef3316]'>Achieve</span> <span className='text-[#0594db]'>Advance</span></p>
          <p className='py-16'>Welcome to TechTalents City, where technology and talent converge to unleash your potential and create endless opportunities</p>
          <div className='w-full rounded-xl shadow-md bg-white/80 flex justify-between items-center py-4 px-5'>
              <p className='text-black/50'>Search Projects</p>
              <div className="bg-black w-10 h-10 rounded-full p-3 flex justify-center items-center">
                  <IoIosSearch size={24} color='white' />
              </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
