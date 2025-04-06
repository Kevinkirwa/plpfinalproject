import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import server from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          console.log('Verifying email with token:', activation_token);
          const response = await axios.get(
            `${server}/api/v2/user/verify-email?token=${activation_token}`
          );
          console.log('Verification response:', response.data);
          setSuccess(true);
          setMessage("Email verified successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } catch (error) {
          console.error('Verification error:', error);
          setError(true);
          setMessage(
            error.response?.data?.message || "Failed to verify email. Please try again."
          );
        }
      };
      sendRequest();
    }
  }, [activation_token, navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      {error ? (
        <p>{message}</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ActivationPage;
