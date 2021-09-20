const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const checkToken = require("./middlewares/verifyToken");
const trashApiObj = express.Router();
trashApiObj.use(express.json());
let trashCollection;
trashApiObj.use((req, res, next) => {
  trashCollection = req.app.get("trashCollection");
  next();
});
module.exports = trashApiObj;
