import image from '../../assets/images/Xdg.jpeg'
import Container from '../../components/Container';

const TechPathNavigator = () => {
  return (
    <Container className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-12 p-8 bg-white 2xl:px-36">
      
      <div className="lg:w-[50%] lg:h-[746px] flex justify-center mb-2 lg:mb-0 shrink-0">
        <img src={image} alt="Tech journey visualization" className="object-cover object-center rounded-3xl" />
      </div>

      <div className="w-full flex flex-col gap-5 justify-between h-full lg:h-[746px]">
        <h2 className="text-2xl xl:text-3xl font-bold">
          Navigate Your Tech Journey with AI-Powered Insights
        </h2>

        <ul className="space-y-6">

          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">AI-Powered Skill Discovery</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2">
                  Our AI analyzes your project contributions and learning patterns to uncover strengths and identify transferable skills relevant to high-demand tech roles.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Personalized Roadmap</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2">
                  Get a personalized project roadmap aligned with your career goals and track your growth by solving real-world problems.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex items-start">
              <div className="shrink-0 w-3 h-16 rounded-3xl bg-blue-600 mr-3"></div>
              <div>
                <h3 className="font-bold text-lg">Explore Career Paths</h3>
                <p className="text-sm xl:text-base text-[#737373] mt-2">
                  Explore different tech career paths by solving problems that mirror in-demand roles and gain clarity on your next step as you grow from novice to expert.
                </p>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </Container>
  );
};

export default TechPathNavigator;
