import { React, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadSeller } from "../../redux/actions/user";
import server from "../../server";

const ShopLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LoadSellerRequest" });
      
      const response = await server.post(
        `/shop/login-shop`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("seller_token", response.data.token);
        localStorage.setItem("seller", JSON.stringify(response.data.seller));
        
        dispatch({
          type: "LoadSellerSuccess",
          payload: response.data.seller,
        });
        
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Shop login error:", error);
      dispatch({
        type: "LoadSellerFail",
        payload: error.response?.data?.message || "Login failed",
      });
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            type={visible ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {visible ? (
            <AiOutlineEye
              className="absolute right-2 top-2 cursor-pointer"
              size={20}
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-2 top-2 cursor-pointer"
              size={20}
              onClick={() => setVisible(true)}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to="/shop-create"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create a seller account
          </Link>
        </div>
        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default ShopLogin;
