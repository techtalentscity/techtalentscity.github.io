import image from '../../assets/images/excellence.png';
import Container from '../../components/Container';

const Events = () => {
  return (
    <Container className="flex flex-col lg:flex-row items-stretch gap-8 p-8 bg-white 2xl:px-36">
      {/* Left Section: Image */}
      <div className="flex-shrink-0 w-full lg:w-1/2 flex items-stretch">
        <img
          src={image}
          alt="Awards and Recognition"
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>

      {/* Right Section: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
        <h2 className="text-2xl xl:text-3xl font-bold leading-snug">
          Recognizing Excellence and Innovation at the Tech Summit
        </h2>
        <p className="text-base xl:text-lg text-[#737373] leading-relaxed">
          The Tech Summit, hosted and powered by{' '}
          <span className="font-semibold text-blue-600">Favored Online</span>, celebrates achievements by recognizing individuals and teams who have made outstanding contributions to technology and innovation. Members can apply directly via their dashboards to participate.
        </p>
        <p className="text-base xl:text-lg text-[#737373] leading-relaxed">
          Additionally, we celebrate the{' '}
          <span className="font-semibold text-blue-600">3 best innovative projects of the year</span>, emphasizing creativity, collaboration, and impact. Only free projects are eligible for this prestigious recognition.
        </p>
        <ul className="space-y-6">
          <li>
            <div className="flex items-start">
              <div className="w-3 h-16 rounded-3xl bg-blue-600 mr-4"></div>
              <div>
                <h3 className="font-bold text-lg">Best in Each Section</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2 leading-relaxed">
                  Awards will be presented to the best individuals in each category, including TechPO, TechQA, TechDev, TechLeads, TechArchs, and TechGuard.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="w-3 h-16 rounded-3xl bg-blue-600 mr-4"></div>
              <div>
                <h3 className="font-bold text-lg">Novice to Expert</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2 leading-relaxed">
                  Recognizing the individual who transitioned from novice to expert within a year.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
              <div className="w-3 h-16 rounded-3xl bg-blue-600 mr-4"></div>
              <div>
                <h3 className="font-bold text-lg">Best Innovative Projects</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2 leading-relaxed">
                  Celebrating the 3 best innovative projects of the year. Only free projects are eligible for this recognition.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Events;
