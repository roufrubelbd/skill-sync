import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="text-center mt-20 min-h-screen flex flex-col items-center bg-amber-100">
      <h1 className="text-2xl font-bold text-green-500">
        ✅ Payment Successful! Welcome to Premium
      </h1>
      <Link to="/public-lessons" className="mt-5">
        <button className="btn btn-warning">Go to Lessons</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
