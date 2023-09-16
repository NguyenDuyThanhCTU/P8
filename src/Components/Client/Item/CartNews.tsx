import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const CartNews = ({ Data }: any) => {
  return (
    <>
      <div className="grid p:grid-cols-1 d:grid-cols-3 gap-2 py-5 px-2">
        {Data?.map((items: any) => {
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
    </>
  );
};

export default CartNews;
