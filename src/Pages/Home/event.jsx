import { Button } from "antd";
import Container from "../../components/Container";

const Events = () => {
  return (
    <Container className={'mb-16'}>
      <div className="w-full bg-[#F3F3FF] rounded-3xl flex flex-col justify-center items-center">
        <div className="max-w-sm md:max-w-md flex flex-col justify-center gap-7 items-center text-center py-12">
          <h1 className="text-2xl md:text-4xl font-bold">Showcase Your Talent at the Tech Summit</h1>
          <p className="text-[#101010] text-lg">
            Present your work, gain industry recognition, and expand your network <br /> at the prestigious Tech Summit hosted by Favored Online.
          </p>
          <p className="text-[#101010] text-lg">
            Only free projects are eligible for showcase, and participants will have the opportunity to apply through their dashboard.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Events;

