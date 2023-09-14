import moment from "moment/moment";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useStateProvider } from "../../../../Context/StateProvider";

const Section = ({ Data }: any) => {
  const { setIsLoading } = useStateProvider();
  const router = useNavigate();

  const formattedDate = moment
    .unix(Data[0]?.createdAt.seconds)
    .format("MMMM DD, YYYY");

  const HandleChangeNews = (id: any) => {
    router(`/tin-tuc/${id}`);
    setIsLoading(true);
  };

  return (
    <div>
      <div className=" flex mt-10 font-Montserrat  ">
        <div className="  w-full d:block p:hidden  ">
          <div>
            <div
              className="flex relative mx-auto w-[90%]"
              onClick={() => HandleChangeNews(Data[0]?.id)}
            >
              <div className="w-full">
                <img
                  src={Data[0]?.image}
                  alt="postimage"
                  className="w-full h-[500px]  object-cover"
                />
              </div>
              <div className="absolute p-4 bottom-0 h-[50%] w-full text-white  bg-gradient-to-b  from-[rgba(1,1,1,0.01)] to-[rgb(1,1,1)] items-end flex">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="py-1 px-3 bg-blue-400 text-[16px] uppercase ">
                      Hot news
                    </span>
                  </div>
                  <p className="uppercase text-[28px] font-normal truncate2">
                    {Data[0]?.title}
                  </p>
                  <div className="flex items-center gap-1 ">
                    <AiOutlineClockCircle />
                    <p className="0">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            {Data?.slice(5).map((items: any, idx: any) => {
              const formattedDate = moment
                .unix(items.createdAt.seconds)
                .format("MMMM DD, YYYY");

              return (
                <div
                  key={idx}
                  onClick={() => HandleChangeNews(items.id)}
                  className={`flex items-center   border-b ${
                    idx === 0 ? "pb-10" : "py-10"
                  }`}
                >
                  <div className="flex-[35%] h-[232px]">
                    <img
                      src={items.image}
                      alt="postsimage"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="pl-6 flex flex-col items-start gap-2 flex-[65%]">
                    <h3 className=" truncate2 ">{items.title}</h3>
                    <div className="flex items-center gap-1 text-gray-400">
                      <AiOutlineClockCircle />
                      <p className="">{formattedDate}</p>
                    </div>
                    <p className="text-gray-400 truncate3 text-[16px] font-NunitoSans">
                      {items.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-[70%] w-full ">
          <div className="flex flex-col gap-10">
            <div className=" border-b-4  border-red-400 text-[24px]  font-bold w-[80%]">
              {" "}
              Bài đăng gần đây
            </div>
            {Data?.slice(1, 4).map((items: any, idx: any) => {
              const formattedDate = moment
                .unix(items.createdAt.seconds)
                .format("MMMM DD, YYYY");

              return (
                <div key={idx} onClick={() => HandleChangeNews(items.id)}>
                  <Link to={items.id}>
                    <div
                      className={`flex items-center  cursor-pointer border-b ${
                        idx === 0 ? "pb-10" : "py-10"
                      }`}
                    >
                      <div className="flex-[30%] h-[155px]">
                        <img
                          src={items.image}
                          alt="postsimage"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="px-10 flex flex-col gap-2 flex-[70%]">
                        <p className="truncate3 font-light text-[22px]">
                          {items.title}
                        </p>
                        <div className="flex items-center gap-1 text-gray-400">
                          <AiOutlineClockCircle />
                          <p className="">{formattedDate}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
