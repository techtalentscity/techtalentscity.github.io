import image from '../../assets/images/excellence.png'
import Container from '../../components/Container';
const TechExcellenceSection = () => {
  return (
    <Container className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-12 p-8 bg-white 2xl:px-36">
    {/* <Container className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 p-8 bg-white 2xl:px-36"> */}
      <div className="lg:w-[50%] lg:h-[746px] flex justify-center mb-2 lg:mb-0 shrink-0 ">
        <img src={image} alt="Group of people" className="object-cover object-center rounded-3xl" />
      </div>
      <div className=" w-full flex flex-col gap-5 justify-between h-full lg:h-[746px]">
        <h2 className="text-2xl xl:text-3xl font-bold">
          Achieve tech excellence at TechTalents City.
        </h2>
        <ul className="space-y-6 ">
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Rapid Career Advancement</h3>
                <p className='text-sm xl:text-base text-[#737373] mt-2'>Access to real-world projects allows us to fast-track the career growth of tech professionals, enabling them to transition from novices to experts efficiently.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Real-World Experience and Financial Rewards</h3>
                <p className='text-sm xl:text-base text-[#737373] mt-2'>Participation in paid projects not only bolsters technical and soft skills but also provides financial incentives, blending professional development with tangible benefits.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Recognition Through the TechTalents Badge System</h3>
                <p className='text-sm xl:text-base text-[#737373] mt-2'>Our badges act as a benchmark of professional achievement, enhancing visibility and credibility in the tech industry.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Personalized Career Paths</h3>
                <p className='text-sm xl:text-base text-[#737373] mt-2'>Experience our AI project recommendation system designed to align perfectly with your career goals, enhancing your professional journey and ensuring optimal success.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Dynamic Skill Enhancement</h3>
                <p className='text-sm xl:text-base text-[#737373] mt-2'>Engage with our TTC AI for continuous learning resources and personalized recommendations, keeping you ahead in your field and adaptable to technological advancements.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default TechExcellenceSection;
