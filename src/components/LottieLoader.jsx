import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../LottieLego.json"; 

const LottieLoader = () => {
  return ( <>
    {
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-white to-gray-100">
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        className="w-56 h-56"
      />

      <p className="text-gray-600 mt-4 text-2xl animate-pulse">
        Loading, please wait...
      </p>
    </div>
     || 
    <div><p>......................... LOADING ...........................</p></div>
    }

    </>
  );
};

export default LottieLoader;
