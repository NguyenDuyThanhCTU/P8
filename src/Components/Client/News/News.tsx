import React, { useState, useEffect } from "react";
import { useData } from "../../../Context/DataProviders";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import CartNews from "../Item/CartNews";

const News: React.FC = () => {
  const { Posts } = useData();
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setCurrentItems(
      Posts.filter((items: any) => items.type === "news").slice(
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
      <div className="my-16 d:w-[1300px] d:mx-auto p:w-auto p:mx-2">
        <div className="h-10 flex  justify-center items-center gap-5">
          <div className="bg-[url(https://yensaotrison.com/images/bg_tit.png)] h-4 w-[83px] bg-cover bg-no-repeat"></div>
          <h3 className="text-mainred text-[30px] uppercase leading-10 font-UTMAmerican font-bold">
            Tin tức
          </h3>
          <div className="bg-[url(https://yensaotrison.com/images/bg_tit1.png)] h-4 w-[86px] bg-cover bg-no-repeat"></div>
        </div>
        <>
          <CartNews Data={currentItems} />
          {Posts.length > 16 && (
            <Pagination
              defaultCurrent={6}
              total={Posts.length}
              onChange={handlePageChange}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default News;
