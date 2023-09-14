import React, { useState } from "react";

import { AiOutlineCloudUpload } from "react-icons/ai";

import { Empty, notification } from "antd";

import ListSlide from "./ListSlide/ListSlide";

import SubSection from "./SubSection/SubSection";
import { useStateProvider } from "../../../../../../Context/StateProvider";
import {
  addDataToDocument,
  addDocument,
} from "../../../../../../Config/Services/Firebase/FireStoreDB";
import { uploadImage } from "../../../../Item/Handle";

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const Section = ({ name, type }: any) => {
  const [imageUrl, setImageUrl] = useState();
  const [Data, setData] = useState();
  const [selected, setSelected] = useState(false);
  const { setIsRefetch } = useStateProvider();

  const HandleUploadImage = (e: ChangeEventType, locate: string) => {
    uploadImage(e, locate).then((data: any) => {
      setImageUrl(data);
    });
  };

  const HandleUpdate = () => {
    const data = {
      image: `${imageUrl ? imageUrl : Data}`,
    };
    let collectionName: string;
    if (type === "achievements") {
      collectionName = "achievementsImage";
    } else {
      collectionName = "titlesImage";
    }

    addDocument(collectionName, data).then(() => {
      notification["success"]({
        message: "Thành công !",
        description: `
        Thông tin đã được CẬP NHẬT !`,
      });
      setIsRefetch("personal title");
      setSelected(false);
    });
  };

  return (
    <div className=" rounded-xl">
      <div className="p-4 flex gap-5 border flex-col">
        <div className="flex items-center justify-start gap-2 ">
          <div className="h-1 w-[70px] bg-[#40b2b5] d:block p:hidden"></div>
          <h3 className="text-[24px] font-normal uppercase text-center">
            {name}
          </h3>
        </div>
        <div className="flex gap-5">
          <div className="grid grid-cols-2 gap-10 cursor-pointer  h-[550px]  p-5 border">
            <div className="shadow-2xl bg-[#353535] h-[300px] hover:shadow-gray-700 duration-300">
              <div className="w-[480px] h-[320px]">
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt=""
                      className="w-[467px] h-full object-cover"
                    />
                  </>
                ) : (
                  <div className="text-white  bg-w w-full">
                    <Empty
                      imageStyle={{ height: 60 }}
                      description={
                        <span className="text-white">
                          Hình ảnh chưa được tải lên
                        </span>
                      }
                    />
                  </div>
                )}
              </div>
              <div className=" ml-3 ">
                <h3 className="py-3 text-[25px] font-bold ">
                  Thay đổi hình ảnh
                </h3>
                <div className="mb-5 flex  items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 text-[20px] bg-[#6A35EE] rounded-full  text-center z-10 flex items-center gap-2">
                    <AiOutlineCloudUpload className="text-white " />
                    <p>Tải lên</p>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={(e) => HandleUploadImage(e, "introduction")}
                    />
                  </label>
                  <p>hoặc</p>
                  <div onClick={() => setSelected(true)}>
                    <input
                      type="text"
                      placeholder="Nhập liên kết hình ảnh"
                      className="py-3 px-4 text-black  border rounded-full outline-none"
                      onChange={(e: any) => setData(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {selected || imageUrl ? (
                <div className="mt-5">
                  <div
                    className="text-center  uppercase py-2 border mx-2 bg-purple hover:bg-purpleAdmin hover:text-purpleHover hover:border-purpleHover text-blueAdmin border-blueAdmin block group-hover:hidden"
                    onClick={() => HandleUpdate()}
                  >
                    Cập nhật
                  </div>
                </div>
              ) : (
                <div className="text-center uppercase py-2 border mx-2 bg-purple  text-gray-400 border-gray-400 block ">
                  Cập nhật
                </div>
              )}
            </div>
            <SubSection type={type} />
          </div>

          <ListSlide type={type} />
        </div>
      </div>
    </div>
  );
};

export default Section;
