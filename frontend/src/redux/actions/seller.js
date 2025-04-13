import axios from "axios";
import server from "../../server";

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });
    
    // Get the seller token
    const token = localStorage.getItem('seller_token');
    if (!token) {
      throw new Error('No seller token found');
    }

    // Make the request with the token
    const { data } = await server.get(`/shop/getSeller`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (data.success && data.seller) {
      dispatch({ type: "LoadSellerSuccess", payload: data.seller });
      return { success: true, seller: data.seller };
    } else {
      throw new Error('Invalid seller data received');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to load seller";
    dispatch({
      type: "LoadSellerFail",
      payload: errorMessage,
    });
    // Clear invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem('seller_token');
    }
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