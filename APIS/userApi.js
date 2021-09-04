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
    if (user) {
      res.send({ message: "User Already Existed" });
    } else {
      let hashedPassword = await bcryptjs.hash(newUser.password, 6);
      newUser.password = hashedPassword;
      await userCollection.insertOne(newUser);
      res.send({ message: "User Registered Successfully" });
    }
  })
);

userApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    let userCredentialObj = req.body;
    let user = await userCollection.findOne({
      email: userCredentialObj.email,
    });
    console.log(user);
    if (user === null) {
      res.send({ message: "Invalid Username" });
    } else {
      let status = await bcryptjs.compare(
        userCredentialObj.password,
        user.password
      );
      if (status === false) {
        res.send({ message: "Invalid Password" });
      } else {
        let signedToken = await jwt.sign(
          { email: user.email },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
        res.send({ message: "success", token: signedToken, user: user });
      }
    }
  })
);

module.exports = userApiObj;
