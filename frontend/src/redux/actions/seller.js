import axios from "axios";
import server from "../../server";

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });
    const { data } = await server.get(`/shop/getSeller`);
    
    dispatch({ type: "LoadSellerSuccess", payload: data.seller });
    return { success: true, seller: data.seller };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to load seller";
    dispatch({
      type: "LoadSellerFail",
      payload: errorMessage,
    });
    return { success: false, error: errorMessage };
  }
};

// get all sellers -- admin only
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllSellersRequest" });
    const { data } = await server.get(`/shop/admin-all-sellers`);
    
    dispatch({ type: "getAllSellersSuccess", payload: data.sellers });
    return { success: true, sellers: data.sellers };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch sellers";
    dispatch({
      type: "getAllSellerFailed",
      payload: errorMessage,
    });
    return { success: false, error: errorMessage };
  }
}; 