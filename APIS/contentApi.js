const express = require("express");
const checkToken = require("./middlewares/verifyToken");
const expressAsyncHandler = require("express-async-handler");
const { moviePic } = require("./middlewares/cloudinary");
const contentApiObj = express.Router();
contentApiObj.use(express.json());
let contentCollection;
contentApiObj.use((req, res, next) => {
  contentCollection = req.app.get("contentCollection");
  next();
});
contentApiObj.post(
  "/addcontent",
  checkToken,
  moviePic.single("photo"),
  expressAsyncHandler(async (req, res) => {
    let contentObj = JSON.parse(req.body.contentObj);
    let uniqueContent = await contentCollection.findOne({
      mname: contentObj.mname,
    });
    if (uniqueContent) {
      res.send({ message: "Movie is Already exist" });
    } else {
      //add image cdn link to productObj
      contentObj.image = req.file.path;
      await contentCollection.insertOne(contentObj);
      // send res
      res.send({ message: "New Content Created" });
    }
  })
);

module.exports = contentApiObj;
