import React from "react";
import Banner from "../../components/Banner";
import FeaturedLifeLessons from "../FeaturedLifeLessons/FeaturedLifeLessons";
import WhyLearningFrom from "../../components/WhyLearningFrom";
import TopContributors from "../../components/TopCntributors";
import MostSavedLessons from "../../components/MostSavedLessons";
import About from "../../components/About";
import Contact from "../../components/Contact";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedLifeLessons />
      <WhyLearningFrom />
      <TopContributors />
      <MostSavedLessons />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
