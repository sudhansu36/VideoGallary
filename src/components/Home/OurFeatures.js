import React from "react";
import GetStarted from "./GetStarted";
const OurFeatures = ({ setLModal, token }) => {
  return (
    <div className="my-1">
      <div className="container-fluid text-light">
        <div className="row row-cols-1">
          <div className="col p-0 my-2">
            <div className="card  bg-transparent border-0">
              <div className="card-body row p-0 m-0">
                <div className="col-lg-4 col-sm-12 p-0">
                  <img
                    src="https://res.cloudinary.com/djczbozsv/image/upload/v1630683776/VIDEO%20GALLERY/HOME/surrealism_dark_hell_stairs_4k_hd-1920x1080_nyppvk.jpg"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="col my-auto mx-3">
                  <div className="my-1">
                    <h1>Great Entertainment</h1>
                    <p className="lead">
                      With your Prilix membership, you have access to exclusive
                      Originals, blockbuster Bollywood movies, regional movies
                      and more.
                    </p>
                    {token && <GetStarted setLModal={setLModal} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col p-0 my-1">
            <div className="card border-0 bg-transparent">
              <div className="card-body row p-0 m-0">
                <div className="col order-lg-1 order-2 text-lg-end my-auto mx-3">
                  <div className="my-1">
                    <h1>Download and go</h1>
                    <p className="lead">
                      Watch offline on the Prilx Video app when you download
                      titles to your iPhone, iPad, Tablet, or Android device.
                    </p>
                    {token && <GetStarted setLModal={setLModal} />}
                  </div>
                </div>
                <div className="col-lg-4 order-lg-2  p-0">
                  <img
                    src="https://res.cloudinary.com/djczbozsv/image/upload/v1630683861/VIDEO%20GALLERY/HOME/robot_umbrella_4k_hd_creative-1920x1080_qnesu4.jpg"
                    alt=""
                    className="w-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col p-0 my-2">
            <div className="card border-0 bg-transparent">
              <div className="card-body row p-0 m-0">
                <div className="col-lg-4 col-sm-12 p-0">
                  <img
                    src="https://res.cloudinary.com/djczbozsv/image/upload/v1630683675/VIDEO%20GALLERY/HOME/motivational_17_4k_hd_creative-1920x1080_qnd2fc.jpg"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="col my-auto mx-3">
                  <div className="my-1">
                    <h1>Watch anywhere</h1>
                    <p className="lead">
                      Enjoy from the web or with the Prilix Video app on your
                      phone, tablet, or select Smart TVs — on up to any devices
                      at once.
                    </p>
                    {token && <GetStarted setLModal={setLModal} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col p-0 my-1">
            <div className="card border-0 bg-transparent">
              <div className="card-body row p-0 m-0">
                <div className="col order-lg-1 order-2 text-lg-end my-auto mx-3">
                  <div className="my-1">
                    <h1>Data saver</h1>
                    <p className="lead">
                      Control data usage while downloading and watching videos
                      on select phones or tablets.
                    </p>
                    {token && <GetStarted setLModal={setLModal} />}
                  </div>
                </div>
                <div className="col-lg-4 order-lg-2  p-0">
                  <img
                    src="https://res.cloudinary.com/djczbozsv/image/upload/v1630684254/VIDEO%20GALLERY/HOME/technology_anonymous_4k_hd_creative-1920x1080_u4nmif.jpg"
                    alt=""
                    className="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurFeatures;
// This is only used in Home.js
