import image from '../../assets/images/excellence.png';
import Container from '../../components/Container';

const Events = () => {
  return (
    <Container className="flex flex-col lg:flex-row gap-6 md:gap-6 lg:gap-6 p-8 bg-white 2xl:px-36">
      <div className="lg:w-[50%] flex justify-center mb-2 lg:mb-0 shrink-0">
        <img src={image} alt="Awards and Recognition" className="object-cover object-center rounded-3xl" />
      </div>
      <div className="w-full flex flex-col gap-5 justify-between h-auto">
        <h2 className="text-2xl xl:text-3xl font-bold">
          Recognizing Excellence and Innovation at the Tech Summit
        </h2>
        <p className="text-base xl:text-lg text-[#737373] mb-4">
          The Tech Summit is a celebration of achievements, recognizing individuals and teams who have made outstanding contributions in technology and innovation. Participants are awarded based on their roles and the impact of their projects in various categories.
        </p>
        <p className="text-base xl:text-lg text-[#737373] mb-4">
          Additionally, we celebrate the <span className="font-semibold text-blue-600">3 best innovative projects of the year</span>, emphasizing creativity, collaboration, and impact. Only free projects are eligible for this prestigious recognition.
        </p>
        <ul className="space-y-6">
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Best in Each Section</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2">Awards will be presented to the best individuals in each category, including TechPO, TechQA, TechDev, TechLeads, TechArchs, and TechGuard.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Novice to Expert</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2">Recognizing the individual who transitioned from novice to expert within a year.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Best Innovative Projects</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2">Celebrating the 3 best innovative projects of the year. Only free projects are eligible for this recognition.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Events;
