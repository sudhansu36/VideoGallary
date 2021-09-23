const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const checkToken = require("./middlewares/verifyToken");
const favouriteApiObj = express.Router();
favouriteApiObj.use(express.json());
let favouriteCollection;
favouriteApiObj.use((req, res, next) => {
  favouriteCollection = req.app.get("favouriteCollection");
  next();
});
// Get favourite
favouriteApiObj.get(
  "/getfavourite/:email",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let list = await favouriteCollection.findOne({ email: email });
    if (list) {
      res.send({ message: "success", payload: list.favourite });
    } else {
      res.send({ message: "success", payload: [] });
    }
  })
);
// Add to favourite
favouriteApiObj.post(
  "/addtofavorite",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, id } = req.body;
    let oldContent = await favouriteCollection.findOne({ email: email });
    if (oldContent) {
      await favouriteCollection.updateOne(
        { email: email },
        { $addToSet: { favourite: id } }
      );
      res.send({ message: "success", payload: id });
    } else {
      await favouriteCollection.insertOne({
        email: email,
        favourite: [id],
      });
      res.send({ message: "success", payload: id });
    }
  })
);
// delete from favourite
favouriteApiObj.put(
  "/deletefavorite",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, id } = req.body;
    let { favourite } = await favouriteCollection.findOne({ email: email });
    let index = favourite.findIndex((value) => value === id);
    await favouriteCollection.updateOne(
      { email: email },
      { $pull: { favourite: id } }
    );
    res.send({ message: "success", index: index });
  })
);
module.exports = favouriteApiObj;
