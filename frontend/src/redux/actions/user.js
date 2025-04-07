import axios from "axios";
import server from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const token = localStorage.getItem('token');
    if (!token) {
      dispatch({
        type: "LoadUserFail",
        payload: "No token found",
      });
      return null;
    }

    const { data } = await server.get("/user/getuser", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (data?.user) {
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
      return data.user;
    }
    
    dispatch({
      type: "LoadUserFail",
      payload: "No user data received",
    });
    return null;
  } catch (error) {
    // If token is invalid, clear it
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || error.message,
    });
    return null;
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });

    const token = localStorage.getItem('token');
    if (!token) {
      dispatch({
        type: "LoadSellerFail",
        payload: "No token found",
      });
      return null;
    }

    const { data } = await server.get("/shop/getSeller");
    
    if (data?.seller) {
      dispatch({
        type: "LoadSellerSuccess",
        payload: data.seller,
      });
      return data.seller;
    }
    
    dispatch({
      type: "LoadSellerFail",
      payload: "No seller data received",
    });
    return null;
  } catch (error) {
    // If token is invalid, clear it
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || error.message,
    });
    return null;
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
