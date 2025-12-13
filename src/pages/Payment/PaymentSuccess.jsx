import Lottie from "lottie-react";
import successAnimation from "../../assets/lottie/Success animation.json";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const PaymentSuccess = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Lottie Animation */}
      <div className="w-72 md:w-96 mb-6">
        <Lottie animationData={successAnimation} loop={false} />
      </div>

      <h1 className="text-3xl font-bold text-green-600 mb-2">
        🎉 Payment Successful!
      </h1>

      <p className="text-gray-600 max-w-md mb-6">
        Congratulations{" "}
        <span className="font-semibold">{user?.displayName}</span>! You are now
        a <span className="font-semibold text-warning">Premium ⭐</span> member.
        Enjoy unlimited access to premium life lessons.
      </p>

      <div className="flex gap-4">
        <Link to="/dashboard" className="btn btn-warning rounded-full">
          Go to Dashboard
        </Link>

        <Link
          to="/dashboard/add-lesson"
          className="btn btn-outline rounded-full"
        >
          Create Premium Lesson
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

// import { Link } from "react-router";

// const PaymentSuccess = () => {
//   return (
//     <div className="text-center mt-20 min-h-screen flex flex-col items-center ">
//       <h1 className="text-2xl font-bold text-green-500">
//         ✅ Payment Successful! Welcome to Premium
//       </h1>
//       <Link to="/public-lessons" className="mt-5">
//         <button className="btn btn-warning">Go to Lessons</button>
//       </Link>
//     </div>
//   );
// };

// export default PaymentSuccess;
