const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const checkToken = require("./middlewares/verifyToken");
const watchlistApiObj = express.Router();
watchlistApiObj.use(express.json());
let watchlistCollection;
watchlistApiObj.use((req, res, next) => {
  watchlistCollection = req.app.get("watchlistCollection");
  next();
});

watchlistApiObj.get(
  "/getlist/:email",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let list = await watchlistCollection.findOne({ email: email });
    if (list) {
      res.send({ message: "success", payload: list.watchlist });
    } else {
      res.send({ message: "success", payload: [] });
    }
  })
);
watchlistApiObj.post(
  "/addtowatchlist",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, content } = req.body;
    let newContent = JSON.parse(JSON.stringify(content));
    let oldContent = await watchlistCollection.findOne({ email: email });
    if (oldContent) {
      await watchlistCollection.updateOne(
        { email: email },
        { $addToSet: { watchlist: newContent } }
      );
      res.send({ message: "success", payload: newContent });
    } else {
      await watchlistCollection.insertOne({
        email: email,
        watchlist: [{ ...newContent }],
      });
      res.send({ message: "success", payload: newContent });
    }
  })
);
watchlistApiObj.put(
  "/deletewatchlist",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, content } = req.body;
    let newContent = JSON.parse(JSON.stringify(content));
    let { watchlist } = await watchlistCollection.findOne({ email: email });
    let index = watchlist.findIndex((value) => value.mname === content.mname);
    await watchlistCollection.updateOne(
      { email: email },
      { $pull: { watchlist: { mname: newContent.mname } } }
    );
    res.send({ message: "success", index: index });
  })
);

module.exports = watchlistApiObj;
