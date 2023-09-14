import React from "react";
import Section1 from "./Section/Section1";
import Section2 from "./Section/Section2";
const Introduction = () => {
  return (
    <div className="flex  w-full flex-col items-center bg-gradient-to-t to-[#ffffff]  from-[#e8edef]">
      <div className="d:w-[1440px] p:w-screen">
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
};

export default Introduction;
