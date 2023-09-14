import React, { useState } from "react";
import Section from "./Item/Section";
import { useData } from "../../../Context/DataProviders";

const News: React.FC = () => {
  const [isSelected, setSelected] = useState(false);
  const { Posts } = useData();

  return (
    <div>
      <div className="">
        <div className="w-full items-center flex flex-col font-Montserrat">
          <h3 className="text-content1 text-[42px] font-light">Tin Tức</h3>
          <div className="flex d:flex-row p:flex-col items-center text-[#999999] text-[20px] font-light mt-3 cursor-pointer ">
            <div
              className={`${
                !isSelected ? "border-b border-blue-500" : "border-b"
              } px-10 py-4 `}
              onClick={() => setSelected(false)}
            >
              <p className="text-center w-[100px]"> Khác</p>
            </div>
            <div
              className={`${
                isSelected ? "border-b border-blue-500" : "border-b"
              } px-10 py-4 `}
              onClick={() => setSelected(true)}
            >
              <p className="text-center  w-[100px]"> Công ty</p>
            </div>
          </div>
        </div>
        <div>
          <Section Data={Posts} />
        </div>
      </div>
    </div>
  );
};

export default News;
