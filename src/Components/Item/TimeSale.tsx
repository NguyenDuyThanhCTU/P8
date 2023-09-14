import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useData } from "../../Context/DataProviders";

const TimeSale = () => {
  const { Sale } = useData();

  const [timeRemaining, setTimeRemaining] = useState("");

  let startPoint: any = new Date(Sale.start);
  let endPoint: any = new Date(Sale.end);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime: any = new Date();
      //if startPoint === currentTime => sale is started
      //if endPoint === currentTime => sale is ended
      if (currentTime < startPoint) {
        setTimeRemaining("SALE CHƯA BẮT ĐẦU");
        return;
      } else if (currentTime > endPoint) {
        setTimeRemaining("SALE ĐÃ KẾT THÚC");
        return;
      } else {
        const timeDifference = endPoint - currentTime;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        let formattedTime = `KẾT THÚC SAU: ${hours
          .toString()
          .padStart(2, "0")} : ${minutes
          .toString()
          .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
        if (days > 0) {
          const newHours = 24 * days + hours;
          formattedTime = `KẾT THÚC SAU: ${newHours
            .toString()
            .padStart(2, "0")} : ${minutes
            .toString()
            .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
        }

        setTimeRemaining(formattedTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [Sale]);
  return (
    <div className="flex items-center gap-2 p-3">
      <AiOutlineClockCircle className="text-[24px]" />
      <p>{timeRemaining}</p>
    </div>
  );
};

export default TimeSale;
