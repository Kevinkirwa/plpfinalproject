import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Loader from "../Layout/Loader";

const SuggestedProduct = ({ data }) => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (allProducts && data?.category) {
      const filteredProducts = allProducts.filter(
        (i) => i.category === data.category && i._id !== data._id
      );
      setProductData(filteredProducts);
    }
  }, [allProducts, data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {productData.length > 0 && (
        <div className={`p-4 ${styles.section}`}>
          <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {productData.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedProduct;
