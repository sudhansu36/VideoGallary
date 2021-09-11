import React from "react";
import Carousel from "./Carousel";
import GetStarted from "./GetStarted";
import OurFeatures from "./OurFeatures";
import SquareCard from "./SquareCard";
import { Fade } from "react-reveal";
const Home = ({ setLModal }) => {
  return (
    <div className="fluid">
      <div className="container-fluid">
        <div className="row row-cols-1 d-flex justify-content-between">
          <div className="col-md-3 col-sm-12 my-auto ">
            <Fade left>
              <div className="row row-cols-3 shadow-lg">
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600518/VIDEO%20GALLERY/HOME/home6_ymk88x.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600518/VIDEO%20GALLERY/HOME/home7_figboe.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600517/VIDEO%20GALLERY/HOME/home9_mbsmzu.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600517/VIDEO%20GALLERY/HOME/home1_nwitpv.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600517/VIDEO%20GALLERY/HOME/home4_qg3lxi.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600517/VIDEO%20GALLERY/HOME/home2_siqxhi.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600517/VIDEO%20GALLERY/HOME/home5_y6lufc.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600516/VIDEO%20GALLERY/HOME/home8_fjpskc.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
                <img
                  src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600516/VIDEO%20GALLERY/HOME/home3_aogp3k.jpg"
                  alt=""
                  className="col m-0 p-0"
                />
              </div>
              <div className="text-center my-3 text-light mx-auto">
                <h3 className="text-warning">Welcome to Prilix</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate ullam, id nobis similique sequi accusamus enim
                  veniam praesentium. Vel, maxime.
                </p>
                <GetStarted setLModal={setLModal} />
              </div>
            </Fade>
          </div>
          <div className="col-md-9 m-0 p-0">
            <Carousel />
          </div>
        </div>
        <OurFeatures setLModal={setLModal} />
        <SquareCard />
      </div>
    </div>
  );
};

export default Home;
