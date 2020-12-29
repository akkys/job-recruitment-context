import React from "react";
import ImageCarousel from "./ImageCarousel";

const WelcomPage = () => {
  return (
    <div className="container home-container">
      <ImageCarousel />
      <h2 className="mt-3" style={{ textAlign: "center" }}>
        Welcome to JobSource. Now you can explore your Dream with us.
      </h2>
    </div>
  );
};

export default WelcomPage;
