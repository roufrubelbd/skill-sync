import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const PaymentSuccess = () => {
  const { refetchDbUser } = useAuth();

  useEffect(() => {
    refetchDbUser(); // ✅ Fetch updated isPremium from DB
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-500">
        ✅ Payment Successful! Welcome to Premium
      </h1>
    </div>
  );
};

export default PaymentSuccess;

