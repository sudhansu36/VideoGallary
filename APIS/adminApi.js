const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { userDpObj } = require("./middlewares/cloudinary");
const checkToken = require("./middlewares/verifyToken");
const ObjectId = require("mongodb").ObjectId;
const { decrypt, encrypt } = require("./encryption/EncriptionDecription");
const bcryptjs = require("bcryptjs");
const adminApiObj = express.Router();
adminApiObj.use(express.json());
let adminCollection;
adminApiObj.use((req, res, next) => {
  adminCollection = req.app.get("adminCollection");
  next();
});
// Login
adminApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get user credentials obj
    let { adminCredential } = req.body;
    let adminCredentialObj = decrypt(adminCredential);
    // find user by user name
    let admin = await adminCollection.findOne({
      email: adminCredentialObj.email,
    });
    // if user is not there
    if (admin === null) {
      res.send({ message: "Invalid Username" });
    }
    // user found
    else {
      // compare password
      let status = await bcryptjs.compare(
        adminCredentialObj.password,
        admin.password
      );
      // if Password not Matched
      if (status === false) {
        res.send({ message: "Invalid Password" });
      }
      // password matched
      else {
        // create and send token
        let signedToken = await jwt.sign(
          { email: admin.email },
          process.env.SECRET,
          { expiresIn: 6000 }
        );
        // send token in res
        res.send({ message: "success", token: signedToken, user: admin });
      }
    }
  })
);
// Edit Profile Pic
adminApiObj.put(
  "/editprofilepic",
  checkToken,
  userDpObj.single("photo"),
  expressAsyncHandler(async (req, res) => {
    let encryptedUser = req.body.userObj;
    let user = decrypt(encryptedUser);
    user.image = req.file.path;
    let updatedUser = { ...user };
    delete user._id;
    await adminCollection.updateOne(
      { _id: new ObjectId(updatedUser._id) },
      { $set: user }
    );
    let newEncryptedUser = encrypt(updatedUser);
    res.send({ message: "updated", payload: newEncryptedUser });
  })
);
// Edit Admin Profile
adminApiObj.put(
  "/edituserprofile",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { encryptedUser } = req.body;
    let user = decrypt(encryptedUser);
    let id = user._id;
    let oldUser = await adminCollection.findOne({ _id: ObjectId(user._id) });
    let status = await bcryptjs.compare(user.password, oldUser.password);
    if (status === true) {
      let hashedPassword = await bcryptjs.hash(user.npassword, 6);
      user.password = hashedPassword;
      delete user._id;
      delete user.npassword;
      await adminCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: user }
      );
      user._id = id;
      let encUser = encrypt(user);
      res.send({ message: "updated", payload: encUser });
    } else {
      res.send({ message: "Invalid Password" });
    }
  })
);
module.exports = adminApiObj;
