import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    if (!data) return;
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart?.reduce(
    (acc, item) => acc + (item?.qty || 0) * (item?.discountPrice || 0),
    0
  ) || 0;

  const quantityChangeHandler = (data) => {
    if (!data) return;
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-50">
      <div className="fixed top-0 right-0 min-h-full w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-lg z-50">
        {!cart || cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className="flex flex-col items-center">
              <IoBagHandleOutline size={50} className="text-gray-300 mb-4" />
              <h5 className="text-lg font-medium text-gray-500">Your cart is empty!</h5>
              <Link to="/products" className="mt-4 text-blue-600 hover:text-blue-700">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              
              <div className="flex items-center p-4 border-b">
                <IoBagHandleOutline size={25} className="text-gray-600" />
                <h5 className="pl-2 text-xl font-medium">
                  {cart?.length || 0} {cart?.length === 1 ? "Item" : "Items"}
                </h5>
              </div>

              <div className="w-full">
                {cart?.map((item, index) => (
                  item && <CartSingle
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              <div className="flex justify-between items-center mb-3 text-gray-800">
                <span className="text-base">Subtotal:</span>
                <span className="text-lg font-semibold">KES {totalPrice.toLocaleString()}</span>
              </div>
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-[100%] bg-black hover:bg-gray-900 transition-colors duration-200 rounded-md">
                  <h1 className="text-white text-[18px] font-[600]">
                    Checkout Now • KES {totalPrice.toLocaleString()}
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  if (!data) return null;
  
  const [value, setValue] = useState(data.qty || 1);
  const totalPrice = (data.discountPrice || 0) * value;

  const increment = (data) => {
    if (!data) return;
    if (data.stock < value + 1) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    if (!data) return;
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={data?.images?.[0]?.url || ''}
            alt={data.name || 'Product'}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{data.name || 'Product'}</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span>KES {(data.discountPrice || 0).toLocaleString()}</span>
                <span>×</span>
                <span>{value}</span>
              </div>
              <div className="mt-2 font-semibold text-gray-900">
                KES {totalPrice.toLocaleString()}
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700 p-1"
              onClick={() => removeFromCartHandler(data)}
            >
              <RxCross1 size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} />
            </button>
            <span className="w-8 text-center">{value}</span>
            <button
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              onClick={() => increment(data)}
            >
              <HiPlus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
