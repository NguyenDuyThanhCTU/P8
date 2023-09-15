import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../Context/DataProviders";

const Products: React.FC = () => {
  const [product, setProduct] = useState([]);
  const [navigateUrl, setNavigateUrl] = useState("");
  const { Products } = useData();
  const { id } = useParams();

  //if id is not null, filter field : childrenUrl, parentUrl and typeUrl in product by id
  useEffect(() => {
    if (id) {
      const sortParent = Products?.filter(
        (items: any) => items.parentUrl === id
      );
      const sortChildren = Products?.filter(
        (items: any) => items.childrenUrl === id
      );
      const sortType = Products?.filter((items: any) => items.typeUrl === id);
      if (sortParent.length > 0) {
        setProduct(sortParent);
        setNavigateUrl("parent");
      } else if (sortChildren.length > 0) {
        setProduct(sortChildren);
        setNavigateUrl("children");
      } else if (sortType.length > 0) {
        setProduct(sortType);
        setNavigateUrl("type");
      }
    } else {
      setProduct(Products);
    }
  }, [id, Products]);

  return (
    <>
      <div className="my-16 w-[1300px] mx-auto">
        <div className="h-10 flex  justify-center items-center gap-5">
          <div className="bg-[url(https://yensaotrison.com/images/bg_tit.png)] h-4 w-[83px] bg-cover bg-no-repeat"></div>
          <h3 className="text-mainred text-[30px] uppercase leading-10 font-UTMAmerican font-bold">
            {product.length > 0 && (
              <>{id ? Products[0][navigateUrl] : "Sản phẩm"}</>
            )}
          </h3>
          <div className="bg-[url(https://yensaotrison.com/images/bg_tit1.png)] h-4 w-[86px] bg-cover bg-no-repeat"></div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Products;
