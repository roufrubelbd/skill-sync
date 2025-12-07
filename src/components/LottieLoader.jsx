import React from "react";

const LottieLoader = () => {
  return (
    <div className="min-h-screen flex justify-center items-start mt-10 ">
      <span className="loading loading-bars loading-lg text-accent"></span>
      <span className="loading loading-bars loading-lg text-warning"></span>
      <span className="loading loading-bars loading-xl text-info"></span>
    </div>
  );
};

export default LottieLoader;
