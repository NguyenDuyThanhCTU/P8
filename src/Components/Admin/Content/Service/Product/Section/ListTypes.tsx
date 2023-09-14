import React from "react";
import { useStateProvider } from "../../../../../../Context/StateProvider";
import { useData } from "../../../../../../Context/DataProviders";
import { TypeProductItems } from "../../../../../../Utils/item";

const ListProduct: React.FC = () => {
  const { setDropDown } = useStateProvider();
  const { productTypes } = useData();
  const children = productTypes.filter(
    (data: any) => data.parentName === "Girls"
  );
  console.log(children);
  return (
    <div className="d:w-[400px] shadow-2xl bg-[#353535] p:w-auto">
      <div className="p-3">
        <div className="flex justify-between items-center text-[25px] p-3 flex-col gap-3">
          <p className="uppercase text-center w-full from-yellow-400">
            Mục sản phẩm
          </p>
          <div className="h-[400px] p:w-[60vw] d:w-[370px] bg-white text-black overflow-y-auto">
            <div className="p-2">
              {TypeProductItems.map((items, idx) => {
                const children = productTypes.filter(
                  (data: any) => data.parentName === items.label
                );

                return (
                  <div key={idx} className="pb-4 border-b border-black">
                    <span className="text-[20px]">{items.label}</span>
                    {children.length > 0 && (
                      <div className="ml-3 indent-2 flex flex-col border-l-2 border-black">
                        {children.map((item: any, idx: any) => (
                          <div key={idx}>
                            {" "}
                            <span className="text-[18px]">{item.name}</span>
                            {item.children.length > 0 && (
                              <div>
                                {item.children.map((data: any, idx: any) => (
                                  <div className="ml-6 indent-2 flex flex-col border-l-2 border-black">
                                    <span className="text-[16px]">
                                      {data.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="bg-white text-redPrimmary px-4 py-1 rounded-lg uppercase cursor-pointer hover:scale-110 duration-300"
            onClick={() => setDropDown("add-types")}
          >
            Thêm
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
