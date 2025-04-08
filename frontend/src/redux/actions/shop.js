import axios from "axios";
import server from "../../server";

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

// load shop
export const loadShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "loadShopRequest",
    });

    const { data } = await axios.get(`${server}/shop/get-shop-info/${id}`);

    dispatch({
      type: "loadShopSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "loadShopFail",
      payload: error.response?.data?.message || "Failed to load shop",
    });
  }
};

// get shop orders
export const getShopOrders = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getShopOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/get-seller-orders/${shopId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getShopOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getShopOrdersFail", 
      payload: error.response?.data?.message || "Failed to get shop orders",
    });
  }
};

// get shop products
export const getShopProducts = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getShopProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products-shop/${shopId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getShopProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getShopProductsFail",
      payload: error.response?.data?.message || "Failed to get shop products",
    });
  }
};

// get shop stats
export const getShopStats = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getShopStatsRequest",
    });

    const { data } = await axios.get(`${server}/shop/get-shop-stats/${shopId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getShopStatsSuccess",
      payload: data.stats,
    });
  } catch (error) {
    dispatch({
      type: "getShopStatsFail",
      payload: error.response?.data?.message || "Failed to get shop statistics",
    });
  }
};

// update shop profile
export const updateShopProfile = (shopId, updateData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateShopProfileRequest",
    });

    const { data } = await axios.put(
      `${server}/shop/update-shop-profile/${shopId}`,
      updateData,
      { withCredentials: true }
    );

    dispatch({
      type: "updateShopProfileSuccess",
      payload: data.shop,
    });

    return { success: true, shop: data.shop };
  } catch (error) {
    dispatch({
      type: "updateShopProfileFail",
      payload: error.response?.data?.message || "Failed to update shop profile",
    });

    return { success: false, error: error.response?.data?.message || "Failed to update shop profile" };
  }
}; 