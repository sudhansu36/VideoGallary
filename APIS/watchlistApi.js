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
// get all watchlist for user
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
// add to watchlist
watchlistApiObj.post(
  "/addtowatchlist",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, id } = req.body;
    let oldContent = await watchlistCollection.findOne({ email: email });
    if (oldContent) {
      await watchlistCollection.updateOne(
        { email: email },
        { $addToSet: { watchlist: id } }
      );
      res.send({ message: "success", payload: id });
    } else {
      await watchlistCollection.insertOne({
        email: email,
        watchlist: [id],
      });
      res.send({ message: "success", payload: id });
    }
  })
);
// delete from watchlist
watchlistApiObj.put(
  "/deletewatchlist",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, id } = req.body;
    let { watchlist } = await watchlistCollection.findOne({ email: email });
    let index = watchlist.findIndex((value) => value === id);
    await watchlistCollection.updateOne(
      { email: email },
      { $pull: { watchlist: id } }
    );
    res.send({ message: "success", index: index });
  })
);
module.exports = watchlistApiObj;
