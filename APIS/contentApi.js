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
      contentObj.rating = 0;
      await contentCollection.insertOne(contentObj);
      // send res
      res.send({ message: "New Content Created" });
    }
  })
);
contentApiObj.get(
  "/getcontent",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let allContent = await contentCollection.find().toArray();
    res.send({ message: "Collection data", payload: allContent,status:true });
  })
);
contentApiObj.get(
  "/Genres/:genre",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let genre = req.params.genre;
    let allContent = await contentCollection.find({ genres: genre }).toArray();
    res.send({ message: "success", payload: allContent });
  })
);
contentApiObj.get(
  "/Languages/:language",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let language = req.params.language;
    let allContent = await contentCollection
      .find({ languages: language })
      .toArray();
    res.send({ message: "success", payload: allContent });
  })
);
contentApiObj.get(
  "/Category/:category",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let category = req.params.category;
    let allContent = await contentCollection
      .find({ category: category })
      .toArray();
    res.send({ message: "success", payload: allContent });
  })
);
contentApiObj.get(
  "/language",
  expressAsyncHandler(async (req, res) => {
    let language = req.body;
    let allContent = await contentCollection
      .find({ languages: { $all: language.languages } })
      .toArray();
    res.send({ message: "Languages", payload: allContent });
  })
);
module.exports = contentApiObj;
