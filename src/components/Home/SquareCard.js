import React from "react";
const SquareCard = () => {
  return (
    <div>
      <div className="container row row-cols-md-4 row-cols-2 row-cols-sm-2 row-cols-lg-4 g-4 mx-auto px-2 my-4 text-center">
        {/* 4 Figure Image */}
        <div className="col ">
          <figure className="figure">
            <img
              src="https://res.cloudinary.com/djczbozsv/image/upload/v1630683734/VIDEO%20GALLERY/HOME/photography_lighting_road_during_night_time_4k_hd-1920x1080_ty8pqr.jpg"
              className="figure-img img-fluid rounded mx-auto"
              alt="..."
            />
            <figcaption className="figure-caption">Our Journey</figcaption>
          </figure>
        </div>
        <div className="col  mx-auto">
          <figure className="figure">
            <img
              src="https://res.cloudinary.com/djczbozsv/image/upload/v1630697199/VIDEO%20GALLERY/HOME/marshmello_with_colorful_lights_helmet_is_wearing_black_dress_hd_marshmello-1920x1080_bupnah.jpg"
              className="figure-img img-fluid rounded mx-auto"
              alt="..."
            />
            <figcaption className="figure-caption">Our Goal</figcaption>
          </figure>
        </div>{" "}
        <div className="col  mx-auto">
          <figure className="figure">
            <img
              src="https://res.cloudinary.com/djczbozsv/image/upload/v1630697194/VIDEO%20GALLERY/HOME/blue_black_cube_4k_hd_abstract-1920x1080_ov2o65.jpg"
              className="figure-img img-fluid rounded mx-auto"
              alt="..."
            />
            <figcaption className="figure-caption">Our Features</figcaption>
          </figure>
        </div>{" "}
        <div className="col  mx-auto">
          <figure className="figure mx-auto">
            <img
              src="https://res.cloudinary.com/djczbozsv/image/upload/v1630697203/VIDEO%20GALLERY/HOME/black_texture_digital_art_butterfly_hd_abstract-1920x1080_gxili2.jpg"
              className="figure-img img-fluid rounded  mx-auto"
              alt="..."
            />
            <figcaption className="figure-caption">Our Team</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};
export default SquareCard;
// This is only used in Home.js
