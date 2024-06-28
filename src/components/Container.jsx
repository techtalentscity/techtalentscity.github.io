import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  return (

    <div className={twMerge("!px-5 w-[95%] lg:[w-90%] xl:w-[85%] mx-auto", className)}>

      {children}
    </div>
  );
};

export default Container;
