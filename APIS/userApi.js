const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userDpObj } = require("./middlewares/cloudinary");
const userApiObj = express.Router();
userApiObj.use(express.json());
let userCollection;
userApiObj.use((req, res, next) => {
  userCollection = req.app.get("userCollection");
  next();
});
userApiObj.post(
  "/register",
  userDpObj.single("photo"),
  expressAsyncHandler(async (req, res) => {
    let newUser = JSON.parse(req.body.userObj);
    newUser.image = req.file.path;
    let user = await userCollection.findOne({ email: newUser.email });
    if (user === undefined || user === null) {
      let hashedPassword = await bcryptjs.hash(newUser.password, 6);
      newUser.password = hashedPassword;
      await userCollection.insertOne(newUser);
      res.send({ message: "User Registered Successfully" });
    } else {
      res.send({ message: "User Already Existed" });
    }
  })
);
module.exports = userApiObj;
