import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");

  useEffect(() => {
    const updateUserPremium = async () => {
      if (userId) {
        try {
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/users/${userId}/upgrade`
          );
        } catch (err) {
          console.log(err);
        }
      }
      navigate("/dashboard");
    };
    updateUserPremium();
  }, [userId, navigate]);

  return (
    <p className="text-center mt-20">Payment Successful! Redirecting...</p>
  );
};

export default PaymentSuccess;
