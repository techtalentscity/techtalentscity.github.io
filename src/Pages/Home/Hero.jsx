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
        <p className="font-bold pt-12 sm:mt-0 text-4xl md:text-7xl text-center">Ascend, Achieve, Advance.</p>
        <p className='py-16 text-center'>Welcome! Accelerate your tech career with AI-powered project recommendations and learning resources to fast-track your success in your tech talent journey.</p>
        <div className='w-full rounded-xl shadow-md bg-white/80 flex justify-between items-center py-4 px-5'>
            <p className='text-black/50'>Use TTC AI</p>
            <div className="bg-black w-10 h-10 rounded-full p-3 flex justify-center items-center">
                <IoIosSearch size={24} color='white' />
            </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
