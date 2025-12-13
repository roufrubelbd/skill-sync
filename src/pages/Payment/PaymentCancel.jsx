import Lottie from "lottie-react";
import cancelAnimation from "../../assets/lottie/cancel.json";
import { useSearchParams, Link } from "react-router";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

  let message = "Payment was not completed.";

  if (reason === "cancelled") {
    message = "You cancelled the payment process.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
       {/* Lottie Animation */}
      <div className="w-72 md:w-96 mb-6">
        <Lottie animationData={cancelAnimation} loop />

      </div>
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        Payment Cancelled ❌
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        {message}  
        No charges were made. You can try upgrading again anytime.
      </p>

      <Link
        to="/pricing"
        className="btn btn-warning rounded-full"
      >
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancel;
