import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper";
import { FiEdit } from "react-icons/fi";
import { FcViewDetails } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { Popconfirm, message, notification } from "antd";
import { useStateProvider } from "../../../../../../../Context/StateProvider";
import { useData } from "../../../../../../../Context/DataProviders";
import { delDocument } from "../../../../../../../Config/Services/Firebase/FireStoreDB";

const ListSlide = ({ type }: any) => {
  const [ListProducts, setListProducts] = useState<any>([]);
  const { IntroPhoto } = useData();
  const { setIsRefetch } = useStateProvider();

  const HandleDelete = (id: string) => {
    let collectionName: string;
    if (type === "achievements") {
      collectionName = "achievementsImage";
    } else {
      collectionName = "titlesImage";
    }

    delDocument(collectionName, id).then(() => {
      notification["success"]({
        message: "Thành công!",
        description: `Yêu cầu của bạn đã được thực hiện thành công !`,
      });
    });
    setIsRefetch("deleted");
  };

  useEffect(() => {
    if (type === "achievements") {
      const newFilteredArray = IntroPhoto?.archivement;
      setListProducts(newFilteredArray);
    } else {
      const newFilteredArray = IntroPhoto?.titles;
      setListProducts(newFilteredArray);
    }
  }, [IntroPhoto, ListProducts]);

  return (
    <div className="w-[400px] shadow-2xl bg-[#353535]">
      <div className="p-3">
        <div className="flex justify-between items-center text-[25px] pb-3">
          <p className="uppercase text-white text-center w-full">
            Danh sách hình ảnh
          </p>
        </div>
        <div className="h-[200px] w-[350px] border  rounded-2xl">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {ListProducts.map((items: any, idx: number) => (
              <div key={idx}>
                <SwiperSlide>
                  <img
                    src={items.image}
                    alt="banner"
                    className="h-[200px] w-[350px] object-cover p-2"
                  />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
        <div className="h-[250px] w-[350px] border mt-5 rounded-2xl overflow-y-scroll ">
          {ListProducts?.map((data: any, idx: any) => (
            <div
              key={idx}
              className="grid  cols-3 items-center my-2  ml-1 justify-start px-5 "
            >
              <div className="group relative ">
                <FiEdit className="text-red-600 hover:scale-125 duration-300 " />
                <div className="w-[120px] bg-white opacity-90 absolute -top-2 h-8 left-5 rounded-lg hidden group-hover:block ">
                  <div className="mx-3 flex  justify-between text-[24px] h-full items-center ">
                    <FcViewDetails className="hover:scale-125 duration-300" />
                    <FiEdit className="text-green-600 hover:scale-125 duration-300" />
                    <Popconfirm
                      title="Xóa sản phẩm"
                      description="Bạn muốn xóa sản phẩm này?"
                      onConfirm={() => {
                        HandleDelete(data.id);
                      }}
                      onCancel={() => {
                        message.error("Sản phẩm chưa được xóa!");
                      }}
                      okText="Yes"
                      okType="danger"
                      cancelText="No"
                    >
                      <MdDeleteForever className="text-red-600 hover:scale-125 duration-300" />
                    </Popconfirm>
                  </div>
                  <div className="absolute bg-none w-3 h-8 top-0 -left-2"></div>
                </div>
              </div>

              <img
                src={data.image}
                alt="product"
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                {data.daysSinceCreation > 0 ? (
                  <div>
                    {" "}
                    <p className="text-[12px] w-[85px] truncate  py-1 border px-2 rounded-3xl text-orange-300 border-orange-300">
                      {data.daysSinceCreation} ngày trước
                    </p>
                  </div>
                ) : (
                  <>
                    {" "}
                    <p className="text-[12px] w-[65px] truncate  border px-2 py-1 rounded-3xl text-green-300 border-green-300">
                      Bây giờ
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListSlide;
