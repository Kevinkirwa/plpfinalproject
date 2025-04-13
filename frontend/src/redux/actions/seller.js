import axios from "axios";
import server from "../../server";

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });

    const token = localStorage.getItem('seller_token');
    if (!token) {
      throw new Error('No seller token found');
    }

    // First try to get from localStorage for immediate state update
    const cachedSeller = localStorage.getItem('seller');
    if (cachedSeller) {
      dispatch({
        type: "LoadSellerSuccess",
        payload: JSON.parse(cachedSeller),
      });
    }

    // Then verify with server
    const { data } = await server.get("/shop/getSeller", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (data?.success && data?.seller) {
      // Update localStorage and state with fresh data
      localStorage.setItem('seller', JSON.stringify(data.seller));
      dispatch({
        type: "LoadSellerSuccess",
        payload: data.seller,
      });
      return { success: true, seller: data.seller };
    } else {
      throw new Error('Invalid seller data received');
    }
  } catch (error) {
    console.error('Error loading seller:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('seller_token');
      localStorage.removeItem('seller');
    }
    
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.response?.data?.message || error.message };
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

// Logout seller
export const logoutSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutSellerRequest",
    });

    const { data } = await axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutSellerSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutSellerFail",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
}; 