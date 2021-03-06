import React from "react";
const Carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600516/VIDEO%20GALLERY/HOME/home1_nwitpv.jpg"
              alt=""
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              {/* <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p> */}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600516/VIDEO%20GALLERY/HOME/home5_y6lufc.jpg"
              alt=""
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              {/* <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p> */}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/djczbozsv/image/upload/v1630600516/VIDEO%20GALLERY/HOME/home8_fjpskc.jpg"
              alt=""
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              {/* <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p> */}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon me-auto bg-dark opacity-50  rounded-pill"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon ms-auto  bg-dark opacity-50 rounded-pill"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Carousel;
// This is only used in Home.js
