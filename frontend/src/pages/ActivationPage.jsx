import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import server from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          console.log('Verifying email with token:', activation_token);
          const response = await axios.get(`${server}/api/v2/user/verify-email?token=${activation_token}`);
          console.log('Verification response:', response.data);
          // Redirect to login page after successful verification
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } catch (err) {
          console.error('Verification error:', err);
          setError(true);
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
        <p>Your verification token is invalid or has expired!</p>
      ) : (
        <p>Your email has been verified successfully! Redirecting to login...</p>
      )}
    </div>
  );
};

export default ActivationPage;
