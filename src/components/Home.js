import React from "react";
import Carousel from "./Carousel";
import OurFeatures from "./OurFeatures";
const Home = () => {
  return (
    <div className="fluid">
      <div className="container-fluid">
        <div className="row row-cols-1 d-flex justify-content-between">
          <div className="col-md-3 col-sm-12 my-auto ">
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
            <div className="text-center my-3 text-light mx-auto shadow-lg">
              <h3 className="text-warning">WelCome to...</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate ullam, id nobis similique sequi accusamus enim veniam
                praesentium. Vel, maxime.
              </p>
              <button
                type="button"
                className="btn btn-success btn-lg"
                data-bs-dismiss="modal"
              >
                GET STARTED
              </button>
            </div>
          </div>
          <div className="col-md-9 m-0 p-0">
            <Carousel />
          </div>
        </div>
        <OurFeatures />
      </div>
    </div>
  );
};

export default Home;
