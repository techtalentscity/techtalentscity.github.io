import { Button } from "antd";
import Container from "../../components/Container";

const Events = () => {
  return (
    <Container className="mb-16">
      <div className="w-full bg-gradient-to-r from-blue-50 via-blue-100 to-purple-50 rounded-3xl shadow-lg flex flex-col justify-center items-center p-8">
        <div className="max-w-lg md:max-w-xl flex flex-col justify-center gap-6 items-center text-center py-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#101010] leading-tight">
            Showcase Your Talent <br /> at the Tech Summit
          </h1>
          <p className="text-[#555555] text-base md:text-lg leading-relaxed">
            Present your work, gain industry recognition, and expand your network <br /> at the prestigious Tech Summit hosted by <span className="font-semibold text-blue-600">Favored Online</span>.
          </p>
          <p className="text-[#555555] text-base md:text-lg leading-relaxed">
            <span className="font-semibold text-purple-600">Only free projects</span> are eligible for showcase, and participants will have the opportunity to apply through their dashboard.
          </p>
          <Button
            type="primary"
            size="large"
            className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold rounded-lg shadow-md px-8 py-4"
          >
            Post your Project Now
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Events;
