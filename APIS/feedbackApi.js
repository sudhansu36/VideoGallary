const express = require("express");
const expressAsyncHandler = require("express-async-handler");
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
    console.log(feedback);
    await feedbackCollection.insertOne(feedback);
    res.send({ message: "feedback submited" });
  })
);

module.exports = feedbackApiObj;
