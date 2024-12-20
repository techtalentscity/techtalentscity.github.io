import { Button } from "antd";
import Container from "../../components/Container";

const Events = () => {
  return (
    <Container className="mb-16">
      <div className="w-full bg-gradient-to-r from-blue-50 via-blue-100 to-purple-50 rounded-2xl shadow-md flex flex-col justify-center items-center p-10 md:p-16">
        <div className="max-w-2xl flex flex-col justify-center gap-8 items-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#101010] leading-tight">
            Celebrate Excellence at the Tech Summit
          </h1>
          <p className="text-[#555555] text-lg md:text-xl leading-relaxed">
            Recognizing top performers in tech across multiple categories for their outstanding contributions to collaborative projects:
          </p>
          <ul className="text-[#555555] text-lg md:text-xl leading-relaxed space-y-2">
            <li><span className="font-semibold text-purple-600">TechPO:</span> Product Owners</li>
            <li><span className="font-semibold text-purple-600">TechQA:</span> Quality Testers</li>
            <li><span className="font-semibold text-purple-600">TechDev:</span> Coding Developers</li>
            <li><span className="font-semibold text-purple-600">TechLeads:</span> Non-Technical Professionals</li>
            <li><span className="font-semibold text-purple-600">TechArchs:</span> Low/No-Code Developers</li>
            <li><span className="font-semibold text-purple-600">TechGuard:</span> Network and Cybersecurity Experts</li>
          </ul>
          <p className="text-[#555555] text-lg md:text-xl leading-relaxed">
            Special recognition for individuals who transitioned from novice to expert within a year!
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
