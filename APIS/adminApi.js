const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { checkRole } = require("./middlewares/verifyRole");
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
  checkRole(true),
  expressAsyncHandler(async (req, res) => {
    // get user credentials obj
    let adminCredentialObj = req.body;
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

module.exports = adminApiObj;
