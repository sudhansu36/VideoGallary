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
// get all Content
contentApiObj.get(
  "/getcontent",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let allContent = await contentCollection.find().toArray();
    res.send({ message: "Collection data", payload: allContent, status: true });
  })
);
// Add content
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
// Delete Content
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
// Edit Content
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
      { _id: new ObjectId(updatedContent._id)},
      { $set: contentObj }
    );
    res.send({ message: "updated", payload: updatedContent });
  })
);
module.exports = contentApiObj;
