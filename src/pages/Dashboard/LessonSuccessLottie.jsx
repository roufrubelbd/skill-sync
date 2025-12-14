import Lottie from "lottie-react";
import successAnimation from "../../assets/lottie/success.json";

const LessonSuccessLottie = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Lottie
        animationData={successAnimation}
        loop={false}
        className="w-44"
      />
      <h2 className="text-2xl font-bold mt-4 text-green-600">
        Lesson Added Successfully 🎉
      </h2>
      <p className="text-gray-500 mt-1">
        Your lesson is now live on the platform.
      </p>
    </div>
  );
};

export default LessonSuccessLottie;
