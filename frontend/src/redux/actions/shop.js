import axios from "axios";
import { server } from "../../server";

// create shop
export const createShop = (shopData) => async (dispatch) => {
  try {
    dispatch({
      type: "createShopRequest",
    });

    const { data } = await axios.post(`${server}/shop/create-shop`, shopData, {
      withCredentials: true,
    });

    dispatch({
      type: "createShopSuccess",
      payload: data.shop,
    });

    return { success: true, shop: data.shop };
  } catch (error) {
    dispatch({
      type: "createShopFail",
      payload: error.response?.data?.message || "Failed to create shop",
    });

    return { success: false, error: error.response?.data?.message || "Failed to create shop" };
  }
};

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellersFailed",
      payload: error.response?.data?.message,
    });
  }
}; 