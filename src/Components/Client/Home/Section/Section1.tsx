import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { useData } from "../../../../Context/DataProviders";
import { Link } from "react-router-dom";

const Section1 = () => {
  const { Slides } = useData();

  return (
    <div className="my-16 d:w-[1300px] d:mx-auto p:w-auto ">
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {Slides.map((items: any, idx: number) => (
          <SwiperSlide>
            <div className="w-[1300px] h-[475px] overflow-hidden">
              <img
                className="p-2 h-full w-full object-contain hover:scale-105 duration-500"
                src={items.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-2 py-5 px-5 d:flex-row p:flex-col">
        <div className=" flex-[45%]">
          <img
            src="https://yensaotrison.com/upload/hinhanh/z2503880890314-adb72f4c6dc9d7aeffb458c8aca29e4e-3604_522x416.jpg"
            alt="banner"
            className="w-full h-full"
          />
        </div>
        <div className=" flex-[55%] px-10">
          <h3 className="font-UTMFleur text-[40px]">Giới thiệu</h3>
          <h3 className="font-UTMAmerican font-bold text-mainred text-center text-[30px] leading-7 uppercase">
            Nội thất đại phát
          </h3>
          <div className="indent-3 mt-5">
            <p>
              Đồ Gỗ Nội Thất ĐẠI PHÁT chuyên sản xuất kinh doanh Đồ gỗ, Nội thất
              cao cấp như: Salon, bàn ghế, tủ, giường, chăn drap, gối nệm. Với
              những sản phẩm có thiết kế từ cổ điển đến hiện đại, đường nét chạm
              khắc tinh xảo, cầu kì, đảm bảo với khách hàng rằng mỗi sản phẩm
              đều được chăm chút tỉ mĩ từng công đoạn để tạo nên một sản phẩm
              hoàn hảo nhất.
            </p>
          </div>
          <Link to={`/gioi-thieu`}>
            <div className="text-mainred mt-5 hover:text-red-700 cursor-pointer">
              Đọc thêm ___
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section1;
