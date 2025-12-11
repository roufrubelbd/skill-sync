import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="text-center mt-10 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-500">
        ✅ Payment Successful! Welcome to Premium
      </h1>
      <Link to="/all-lessons" className="mt-5">
        <button className="btn-warning">Go to Lessons</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
