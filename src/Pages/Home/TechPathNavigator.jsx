import image from '../../assets/images/excellence.png';
import Container from '../../components/Container';

const features = [
  {
    title: "AI-Powered Skill Discovery",
    description: "Our AI analyzes your project contributions and learning patterns to uncover strengths and identify transferable skills relevant to high-demand tech roles.",
    emoji: "🧠",
  },
  {
    title: "Personalized Roadmap",
    description: "Get a personalized project roadmap aligned with your career goals and track your growth by solving real-world problems.",
    emoji: "🗺️",
  },
  {
    title: "Explore Career Paths",
    description: "Explore different tech career paths by solving problems that mirror in-demand roles and gain clarity on your next step as you grow from novice to expert.",
    emoji: "🚀",
  },
  {
    title: "TechMentor Guidance",
    description: "Connect with experienced tech mentors who provide learning resources and guide you in applying your skills to real-world problems.",
    emoji: "🎓", // 🎓 graduation cap emoji to symbolize mentorship and learning
  },
];

const TechPathNavigator = () => {
  return (
    <Container className="bg-white py-16 px-6 md:px-10 2xl:px-36">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900">
          Navigate Your Tech Journey with AI-Powered Insights
        </h2>
        <p className="text-gray-600 mt-4">
          Discover your strengths, plan your learning, and visualize your growth with intelligent guidance every step of the way.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="Tech journey"
            className="w-full h-auto rounded-3xl shadow-md object-cover"
          />
        </div>

        <div className="lg:w-1/2 w-full grid gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3">{feature.emoji}</div>
              <h3 className="font-bold text-lg text-indigo-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TechPathNavigator;
