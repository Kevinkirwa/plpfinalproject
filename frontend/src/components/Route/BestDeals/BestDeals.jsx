import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../../Layout/Loader";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts) {
      const sortedData = [...allProducts].sort((a,b) => b.sold_out - a.sold_out); 
      const firstFive = sortedData.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]);

  if (isLoading) {
    return (
      <div className={`${styles.section}`}>
        <div className="flex justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.length > 0 ? (
            data.map((i, index) => <ProductCard data={i} key={index} />)
          ) : (
            <div className="w-full col-span-full flex justify-center">
              <p className="text-lg font-medium">No deals available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
