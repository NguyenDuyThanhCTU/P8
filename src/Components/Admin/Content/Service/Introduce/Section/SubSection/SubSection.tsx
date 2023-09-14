import React, { useState } from "react";
import { notification } from "antd";

import { useStateProvider } from "../../../../../../../Context/StateProvider";
import { useData } from "../../../../../../../Context/DataProviders";
import { uploadImage } from "../../../../../Item/Handle";
import { updateDocument } from "../../../../../../../Config/Services/Firebase/FireStoreDB";

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const SubSection = (type: any) => {
  const { setIsRefetch } = useStateProvider();
  const [Data, setData] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState(false);

  const { Introduction } = useData();
  const [isSelected, setSelected] = useState(0);

  type ContactDashboardType = {
    name: string;
    type: any;
    placeholder: string;
  }[];

  let ContactDashboard: ContactDashboardType = [];

  if (type.type === "achievements") {
    ContactDashboard = [
      {
        name: "Tên cá nhân",
        type: "input",
        placeholder: Introduction.name,
      },
      {
        name: "Trình độ",
        type: "input",
        placeholder: Introduction.academic,
      },
      {
        name: "Đơn vị công tác",
        type: "textarea",
        placeholder: Introduction.work,
      },
    ];
  } else {
    ContactDashboard = [
      {
        name: "Năm sinh",
        type: "input",
        placeholder: Introduction.yearofbirth,
      },
      {
        name: "Ngày gia nhập ngành",
        type: "input",
        placeholder: Introduction.start,
      },
      {
        name: "Ảnh đại diện",
        type: "input",
        placeholder: Introduction.avatar,
      },
    ];
  }

  const HandleUploadImage = (e: ChangeEventType, locate: string) => {
    uploadImage(e, locate).then((data: any) => {
      setImageUrl(data);
    });
  };

  const HandleUpdate = (idx: any) => {
    if (Data === "" && !imageUrl) {
      notification["error"]({
        message: "Lỗi !",
        description: `
        Vui lòng nhập thông tin trước khi CẬP NHẬT !`,
      });
    } else {
      let newData: any = {};
      if (idx === 0) {
        newData = { username: Data };
      } else if (idx === 1) {
        newData = { academic: Data };
      } else if (idx === 2) {
        newData = { work: Data };
      } else if (idx === 3) {
        newData = { yearOfBirth: Data };
      } else if (idx === 4) {
        newData = { startJob: Data };
      } else if (idx === 5) {
        newData = { avatar: `${imageUrl ? imageUrl : Data}` };
      }

      updateDocument("website", "Introduction", newData).then(() => {
        notification["success"]({
          message: "Thành công !",
          description: `
          Thông tin đã được CẬP NHẬT !`,
        });
        setIsRefetch("new Slide");
      });
    }
  };

  return (
    <div className="bg-[#353535] text-white  rounded-xl shadow-xl">
      <div className="p-4  ">
        <h3 className="text-[25px] text-center ">Thông tin cá nhân</h3>
        <div className="flex flex-col gap-3 mt-5">
          {ContactDashboard.map((items, idx) => {
            let Type = items.type;
            return (
              <div key={idx}>
                <label>{items.name}</label>
                <div className="flex gap-5 ">
                  {Type && (
                    <div onClick={() => setSelected(1)} className="w-full">
                      <Type
                        placeholder={items.placeholder}
                        type="text"
                        className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-full "
                        onChange={(e: any) => setData(e.target.value)}
                      />
                    </div>
                  )}
                  <div>
                    {isSelected === 1 ? (
                      <>
                        {type.type === "achievements" ? (
                          <button
                            className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl w-[95px]"
                            onClick={() => HandleUpdate(1)}
                          >
                            Cập nhật
                          </button>
                        ) : (
                          <button
                            className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl w-[95px]"
                            onClick={() => HandleUpdate(idx + 3)}
                          >
                            Cập nhật
                          </button>
                        )}
                      </>
                    ) : (
                      <button className="text-white bg-gray-400 px-3 py-2 rounded-xl cursor-default w-[95px]">
                        Cập nhật
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {type.type === "titles" && (
          <div>
            <label>
              <div className="flex justify-center mt-10  h-[100px] w-[350px] border rounded-lg cursor-pointer">
                <img
                  src={`${imageUrl ? imageUrl : Introduction.avatar}`}
                  alt="logo"
                  className="object-contain p-2"
                />

                <input
                  type="file"
                  className="w-0 h-0"
                  onChange={(e) => HandleUploadImage(e, "introduction")}
                />
              </div>
            </label>
            {error && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                Vui lòng chọn đúng định dạng
              </p>
            )}
            {imageUrl ? (
              <div className="w-full justify-center flex">
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#fc7474] bg-[#fc747443] px-3 py-2 rounded-xl mt-3 "
                  onClick={() => HandleUpdate(5)}
                >
                  Cập nhật
                </button>
              </div>
            ) : (
              <p className="text-white italic text-[13px] mt-2">
                Nhấp vào logo để tải hình ảnh lên{" "}
                <strong className="text-redPrimmary">(*)</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubSection;
