import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Payment Canceled</h2>
      <p className="mb-4">Your payment was not completed.</p>
      <Link to="/pricing" className="text-blue-600 hover:underline">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancel;
