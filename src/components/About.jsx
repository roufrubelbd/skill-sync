import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-accent">
        About Us
      </h1>

      <p className="text-gray-700 text-lg mb-4 text-center">
        Welcome to <span className="font-semibold">SkillSync</span> — a platform
        designed to help people learn, grow, and share knowledge through
        meaningful lessons.
      </p>

      <div className="space-y-4 text-gray-600">
        <p>
          Our goal is to connect learners with creators who share valuable
          insights on personal growth, career development, mindset, and more.
        </p>

        <p>
          SkillSync empowers users to explore free and premium lessons, save
          their favorites, and engage with a supportive learning community.
        </p>

        <p>
          We believe learning should be simple, accessible, and inspiring for
          everyone.
        </p>
      </div>
    </div>
  );
};

export default About;
