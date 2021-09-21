const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const checkToken = require("./middlewares/verifyToken");
const feedbackApiObj = express.Router();

feedbackApiObj.use(express.json());
let feedbackCollection;
feedbackApiObj.use((req, res, next) => {
  feedbackCollection = req.app.get("feedbackCollection");
  next();
});

feedbackApiObj.post(
  "/sendfeedback",
  expressAsyncHandler(async (req, res) => {
    let feedback = req.body;
    await feedbackCollection.insertOne(feedback);
    res.send({ message: "feedback submited" });
  })
);
feedbackApiObj.get(
  "/getallfeedback",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let feedback = await feedbackCollection.find().toArray();
    res.send({ message: "allfeedback", payload: feedback });
  })
);

module.exports = feedbackApiObj;
