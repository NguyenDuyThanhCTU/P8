import React, { useState, useEffect } from "react";
import { useData } from "../../../Context/DataProviders";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const Cooperate: React.FC = () => {
  const { Posts } = useData();
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  useEffect(() => {
    setCurrentItems(
      Posts.filter((items: any) => items.type === "cooperate").slice(
        indexOfFirstItem,
        indexOfLastItem
      )
    );
  }, [currentPage]);

  const handlePageChange = (pageNumber: any, pageSize: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="my-16 w-[1300px] mx-auto">
        <div className="h-10 flex  justify-center items-center gap-5">
          <div className="bg-[url(https://yensaotrison.com/images/bg_tit.png)] h-4 w-[83px] bg-cover bg-no-repeat"></div>
          <h3 className="text-mainred text-[30px] uppercase leading-10 font-UTMAmerican font-bold">
            hợp tác
          </h3>
          <div className="bg-[url(https://yensaotrison.com/images/bg_tit1.png)] h-4 w-[86px] bg-cover bg-no-repeat"></div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-5">
          {currentItems.map((items: any) => {
            const timestamp = items.createdAt.toDate();

            const year = timestamp.getFullYear();
            const month = timestamp.getMonth() + 1;
            const day = timestamp.getDate();
            return (
              <Link to={`/bai-viet/${items.url}`}>
                <div className="flex gap-2">
                  <div className="">
                    <div className="bg-mainred text-white ">
                      <div className="flex flex-col p-2 items-center">
                        <SlCalender className="font-bold text-[22px]" />
                        <h3 className="font-bold text-[22px]">{day}</h3>
                        <span>
                          {month}/{year}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[340px]">
                    <div className=" h-[215px] overflow-hidden">
                      <img
                        src={items.image}
                        alt="tin tuc"
                        className="hover:scale-110 duration-300 w-full h-full"
                      />
                    </div>
                    <h3 className="uppercase font-semibold cursor-pointer hover:text-mainred duration-300">
                      {items.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {Posts.length > 16 && (
          <Pagination
            defaultCurrent={6}
            total={Posts.length}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Cooperate;
