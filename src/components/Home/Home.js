import React from "react";
import { Fade } from "react-reveal";
import Carousel from "./Carousel";
import GetStarted from "./GetStarted";
import OurFeatures from "./OurFeatures";
import SquareCard from "./SquareCard";
const Home = ({ setLModal }) => {
  return (
    <div className="fluid">
      <div className="container-fluid">
        <div className="row row-cols-1 d-flex justify-content-between">
          {/* 9 Images Grid 3x3 */}
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
                <p>Join Prilix to watch the latest movies, TV shows</p>
                {/* Get Started Button */}
                <GetStarted setLModal={setLModal} />
              </div>
            </Fade>
          </div>
          {/* Carousel */}
          <div className="col-md-9 m-0 p-0">
            <Carousel />
          </div>
        </div>
        {/* Some Horizontal Cards */}
        <OurFeatures setLModal={setLModal} />
        {/* Figures */}
        <SquareCard />
      </div>
    </div>
  );
};
export default Home;
// This is used in App.js for path "/"
