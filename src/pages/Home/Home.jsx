import React from "react";
import Banner from "../../components/Banner";
import FeaturedLifeLessons from "../FeaturedLifeLessons/FeaturedLifeLessons";
import WhyLearningFrom from "../../components/WhyLearningFrom";
import TopContributors from "../../components/TopCntributors";
import MostSavedLessons from "../../components/MostSavedLessons";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedLifeLessons />
      <WhyLearningFrom />
      <TopContributors />
      <MostSavedLessons />
    </div>
  );
};

export default Home;
