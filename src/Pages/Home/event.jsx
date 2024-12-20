import { Button } from "antd";
import Container from "../../components/Container";
import AwardsImage from "../../assets/images/excellence.png"; // Replace with your actual image path

const Events = () => {
  return (
    <Container className="mb-16">
      <div className="relative w-full bg-gradient-to-r from-blue-50 via-blue-100 to-purple-50 rounded-2xl shadow-md flex flex-col md:flex-row items-center p-10 md:p-16">
        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src={AwardsImage}
            alt="Tech Summit Awards"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="max-w-lg md:max-w-xl w-full text-center md:text-left flex flex-col justify-center gap-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#101010] leading-tight">
            Celebrate Excellence and Innovation at the Tech Summit
          </h1>
          <p className="text-[#555555] text-lg md:text-xl leading-relaxed">
            Join us as we recognize outstanding achievements in technology,
            innovation, and collaboration. Awards will be given in the
            following categories:
          </p>
          <ul className="text-[#555555] text-lg md:text-xl leading-relaxed space-y-3">
            <li>
              <span className="font-semibold text-purple-600">💡 TechPO:</span>{" "}
              Product Owners
            </li>
            <li>
              <span className="font-semibold text-purple-600">🛠️ TechQA:</span>{" "}
              Quality Testers
            </li>
            <li>
              <span className="font-semibold text-purple-600">💻 TechDev:</span>{" "}
              Coding Developers
            </li>
            <li>
              <span className="font-semibold text-purple-600">🌟 TechLeads:</span>{" "}
              Non-Technical Professionals
            </li>
            <li>
              <span className="font-semibold text-purple-600">🚀 TechArchs:</span>{" "}
              Low/No-Code Developers
            </li>
            <li>
              <span className="font-semibold text-purple-600">🔒 TechGuard:</span>{" "}
              Network and Cybersecurity Experts
            </li>
          </ul>
          <p className="text-[#555555] text-lg md:text-xl leading-relaxed">
            We will also honor the{" "}
            <span className="font-semibold text-purple-600">
              individual who transitioned from novice to expert
            </span>{" "}
            within a year.
          </p>
          <p className="text-[#555555] text-lg md:text-xl leading-relaxed">
            Plus, the <span className="font-semibold text-blue-600">3 best innovative projects of the year</span> will be selected and awarded. Only free projects are eligible for consideration.
          </p>
          <Button
            type="primary"
            size="large"
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold rounded-full shadow-md px-10 py-4"
          >
            Join the Celebration
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Events;
