const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const checkToken = require("./middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const { userDpObj } = require("./middlewares/cloudinary");
const { decrypt, encrypt } = require("./encryption/EncriptionDecription");
const ObjectId = require("mongodb").ObjectId;
const userApiObj = express.Router();
userApiObj.use(express.json());
let userCollection;
userApiObj.use((req, res, next) => {
  userCollection = req.app.get("userCollection");
  next();
});
// register user
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
      newUser.isAdmin = false;
      await userCollection.insertOne(newUser);
      res.send({ message: "User Registered Successfully" });
    }
  })
);
// user login
userApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    let { userCredential } = req.body;
    let userCredentialObj = decrypt(userCredential);
    let user = await userCollection.findOne({
      email: userCredentialObj.email,
    });
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
// get all user
userApiObj.get(
  "/getalluser",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let alluser = await userCollection.find().toArray();
    res.send({ message: "alluser", payload: alluser });
  })
);
// edit user profile pic
userApiObj.put(
  "/editprofilepic",
  checkToken,
  userDpObj.single("photo"),
  expressAsyncHandler(async (req, res) => {
    let encryptedUser = req.body.userObj;
    let user = decrypt(encryptedUser);
    user.image = req.file.path;
    let updatedUser = { ...user };
    delete user._id;
    await userCollection.updateOne(
      { _id: new ObjectId(updatedUser._id) },
      { $set: user }
    );
    let newEncryptedUser = encrypt(updatedUser);
    res.send({ message: "updated", payload: newEncryptedUser });
  })
);
// edit user profile
userApiObj.put(
  "/edituserprofile",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { encryptedUser } = req.body;
    let user = decrypt(encryptedUser);
    let id = user._id;
    let oldUser = await userCollection.findOne({ _id: ObjectId(user._id) });
    let status = await bcryptjs.compare(user.password, oldUser.password);
    if (status === true) {
      let hashedPassword = await bcryptjs.hash(user.npassword, 6);
      user.password = hashedPassword;
      delete user._id;
      delete user.npassword;
      await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
      user._id = id;
      let encUser = encrypt(user);
      res.send({ message: "updated", payload: encUser });
    } else {
      res.send({ message: "Invalid Password" });
    }
  })
);
module.exports = userApiObj;
