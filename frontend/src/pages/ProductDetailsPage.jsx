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
  const [pageLoading, setPageLoading] = useState(true);

  // Load all products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(getAllProducts());
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, [dispatch]);

  // Set product data when products are loaded
  useEffect(() => {
    if (eventData !== null && allEvents) {
      const eventItem = allEvents.find((i) => i._id === id);
      setData(eventItem || null);
    } else if (allProducts) {
      const productItem = allProducts.find((i) => i._id === id);
      setData(productItem || null);
    }
    setPageLoading(false);
  }, [allProducts, allEvents, id, eventData]);

  // Show loading spinner while initial data is being fetched
  if (isLoading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show not found message if no product is found
  if (!data) {
    return (
      <div>
        <Header />
        <div className="w-full h-[70vh] flex items-center justify-center">
          <p className="text-lg font-medium">Product not found!</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
