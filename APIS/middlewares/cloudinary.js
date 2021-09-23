// imort cloudinary
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// User Dp folder
const clStorage1 = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "VIDEO GALLERY/USERDP",
      public_key: file.fieldname + "_" + Date.now(),
    };
  },
});
// Movie collection folder
const clStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "VIDEO GALLERY/MOVIE COLLECTIONS",
      public_key: file.fieldname + "_" + Date.now(),
    };
  },
});
// config multer
const userDpObj = multer({ storage: clStorage1 });
const moviePic = multer({ storage: clStorage });
// export
module.exports = { userDpObj, moviePic };
