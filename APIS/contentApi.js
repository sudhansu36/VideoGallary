const express = require("express");
const checkToken = require("./middlewares/verifyToken");
const expressAsyncHandler = require("express-async-handler");
const { moviePic } = require("./middlewares/cloudinary");
const ObjectId = require("mongodb").ObjectId;
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
      res.send({ message: "New Content Created", payload: contentObj });
    }
  })
);
contentApiObj.get(
  "/getcontent",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let allContent = await contentCollection.find().toArray();
    res.send({ message: "Collection data", payload: allContent, status: true });
  })
);
contentApiObj.delete(
  "/deletecontent/:mname",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let mname = req.params.mname;
    let allContent = await contentCollection.find().toArray();
    let index = allContent.findIndex((value) => value.mname === mname);
    await contentCollection.deleteOne({ mname: mname });
    res.send({ message: "deleted", index: index });
  })
);
contentApiObj.put(
  "/editcontent",
  checkToken,
  moviePic.single("photo"),
  expressAsyncHandler(async (req, res) => {
    let contentObj = JSON.parse(req.body.contentObj);
    contentObj.image = req.file.path;
    let updatedContent = { ...contentObj };
    delete contentObj._id;
    await contentCollection.updateOne(
      { _id: new ObjectId(updatedContent._id) },
      { $set: contentObj }
    );
    res.send({ message: "updated", payload: updatedContent });
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

module.exports = contentApiObj;
