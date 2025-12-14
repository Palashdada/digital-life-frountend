import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Pricing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <p className="text-center mt-20">Please login to view pricing.</p>;
  }

  if (user.isPremium) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">You are already Premium ⭐</h2>
      </div>
    );
  }

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        {
          userId: user.uid,
        }
      );
      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Error", err.message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Upgrade to Premium ⭐
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Free Plan */}
        <div className="border rounded-lg p-6 text-center shadow bg-white">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
          <p className="mb-4">৳0 / Lifetime</p>
          <ul className="text-left mb-4">
            <li>✔ Create Free Lessons</li>
            <li>✔ View Public Free Lessons</li>
            <li>✔ Save Favorite Lessons</li>
            <li>✔ Access Basic Features</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="border rounded-lg p-6 text-center shadow bg-yellow-50">
          <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
          <p className="mb-4">৳1500 / Lifetime</p>
          <ul className="text-left mb-4">
            <li>✔ Create Premium Lessons</li>
            <li>✔ Access All Public Lessons</li>
            <li>✔ Ad-Free Experience</li>
            <li>✔ Featured Lesson Priority</li>
            <li>✔ Save Unlimited Favorites</li>
            <li>✔ Exclusive Premium Content</li>
          </ul>
          <button
            onClick={handleUpgrade}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Upgrade to Premium"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
