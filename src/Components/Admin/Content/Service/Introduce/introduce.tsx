import React from "react";
import Section from "./Section/Section";
import { useData } from "../../../../../Context/DataProviders";
import { MdOutlineUpdate } from "react-icons/md";

const Introduce = () => {
  const { Introduction } = useData();

  return (
    <div className="flex flex-col gap-5">
      <h3 className=" text-[44px] text-center font-bold mb-2 uppercase">
        Cập nhật trang giới thiệu
      </h3>
      <div className="flex justify-end">
        <div>
          {Introduction.daysSinceCreation > 0 ? (
            <div className="flex items-center gap-2 text-[14px] text-orange-300 border-orange-300 border p-2">
              <MdOutlineUpdate className=" text-[20px]" />
              <p className=" truncate   ">
                <span className="underline">Lần cuối cập nhật:</span>{" "}
                <span className="">
                  {Introduction.daysSinceCreation} ngày trước
                </span>
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[14px] text-green-300 border-green-300 border p-2">
              <MdOutlineUpdate className=" text-[20px]" />
              <p className=" truncate   ">
                <span className="underline">Lần cuối cập nhật:</span>{" "}
                <span className="">Vừa cập nhật</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <Section name="Thành tựu cá nhân" type="achievements" />
      <Section name="Các danh hiệu" type="titles" />
    </div>
  );
};

export default Introduce;
