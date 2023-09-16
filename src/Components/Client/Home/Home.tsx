import React, { useState, useEffect } from "react";
import Section1 from "./Section/Section1";
import Section2 from "./Section/Section2";
import Section3 from "./Section/Section3";
import { useData } from "../../../Context/DataProviders";

import { TypeProductItems } from "../../../Utils/item";
import Section4 from "./Section/Section4";

const Home: React.FC = () => {
  const { Products } = useData();

  return (
    <>
      <Section1 />
      <Section2 Data={Products} />

      {TypeProductItems.map((items: any, idx: number) => {
        const sort = Products.filter(
          (item: any) => item.parent === items.label
        );
        return (
          <>
            <Section3 Data={sort} Title={items.label} />
          </>
        );
      })}
      <Section4 />
    </>
  );
};

export default Home;
