import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data?._id]);

  // Null check for data
  if (!data) {
    return null;
  }

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
    toast.success("Item removed from wishlist!");
  };

  const addToWishlistHandler = (data) => {
    setClick(true);
    dispatch(addToWishlist(data));
    toast.success("Item added to wishlist!");
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        dispatch(addTocart(data));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  // Get the first valid image URL or use a placeholder
  const getImageUrl = () => {
    if (data.images && data.images.length > 0) {
      const firstImage = data.images[0];
      return typeof firstImage === 'string' ? firstImage : firstImage.url;
    }
    return 'https://res.cloudinary.com/demo/image/upload/v1/placeholder-image.jpg';
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={getImageUrl()}
            alt={data.name}
            className="w-full h-[170px] object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://res.cloudinary.com/demo/image/upload/v1/placeholder-image.jpg';
            }}
          />
        </Link>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h5 className={`${styles.shop_name}`}>
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h5>
          <div className="flex items-center">
            <AiOutlineHeart
              className={`${
                click ? "text-red-500" : "text-[#707070]"
              } cursor-pointer ml-5`}
              size={22}
              onClick={() => (click ? removeFromWishlistHandler(data) : addToWishlistHandler(data))}
              title={click ? "Remove from wishlist" : "Add to wishlist"}
            />
            <AiOutlineShoppingCart
              className="text-[#707070] cursor-pointer ml-3"
              size={22}
              onClick={() => addToCartHandler(data._id)}
              title="Add to cart"
            />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.sold} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
