import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Layout/Loader";
import { getAllProducts } from "../redux/actions/product";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    // Load all products when component mounts
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (eventData !== null && allEvents) {
      const eventItem = allEvents.find((i) => i._id === id);
      setData(eventItem || null);
    } else if (allProducts) {
      const productItem = allProducts.find((i) => i._id === id);
      setData(productItem || null);
    }
  }, [allProducts, allEvents, id, eventData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      {data ? (
        <>
          <ProductDetails data={data} />
          {!eventData && <SuggestedProduct data={data} />}
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-lg font-medium">No product found!</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
