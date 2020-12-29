import React from "react";
import { Carousel } from "react-bootstrap";
import Image1 from "../../images/img-logo.jpg";
import Image2 from "../../images/img1.jpg";
import Image3 from "../../images/img2.png";

const ImageCarousel = () => {
  return (
    <div className="">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image1}
            height="500vh"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image2}
            height="500px"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image3}
            height="500px"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
