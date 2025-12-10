import { useEffect } from "react";
// import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  // const { user } = useAuth();

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])

  return (
    <div className="text-center mt-10 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-500">
        ✅ Payment Successful! Welcome to Premium
      </h1>
      <Link to="/public-lessons" className="mt-5">
        <button className="btn-warning">Go to Lessons</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
