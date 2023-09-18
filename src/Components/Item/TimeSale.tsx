import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useData } from "../../Context/DataProviders";

const TimeSale = () => {
  const { Sale } = useData();
  const [days, setDays] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();
  const [hours, setHours] = useState<number>();

  let startPoint: any = new Date(Sale.start);
  let endPoint: any = new Date(Sale.end);
  let currentTime: any = new Date();
  useEffect(() => {
    const interval = setInterval(() => {
      //if startPoint === currentTime => sale is started
      //if endPoint === currentTime => sale is ended

      const timeDifference = endPoint - currentTime;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setDays(days);
      setMinutes(minutes);
      setSeconds(seconds);
      setHours(hours);
    }, 1000);

    return () => clearInterval(interval);
  }, [Sale, minutes, seconds, hours]);

  return (
    <div className="flex items-center gap-2 p-3 ">
      <AiOutlineClockCircle className="text-[24px]" />

      <div className="flex font-UTMAmerican">
        {currentTime < startPoint ? (
          <>
            <p>SALE CHƯA BẮT ĐẦU</p>
          </>
        ) : currentTime > endPoint ? (
          <>
            <p>SALE ĐÃ KẾT THÚC</p>
          </>
        ) : (
          <>
            <p>KẾT THÚC SAU:</p>
            <div className=" font-bold ml-2 flex gap-2 font-LexendDeca">
              <span className="bg-mainred px-1 text-white">{days} Ngày</span>
              <span className="bg-mainred px-1 text-white">{hours}</span>
              <span>:</span>
              <span className="bg-mainred px-1 text-white">{minutes}</span>
              <span>:</span>
              <span className="bg-mainred px-1 text-white">{seconds}</span>
            </div>
          </>
        )}
      </div>
    </div>
    // <></>
  );
};

export default TimeSale;
