const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
// To connect build
app.use(express.static(path.join(__dirname, "./build")));
// Import Api
const userApiObj = require("./APIS/userApi");
const adminApiObj = require("./APIS/adminApi");
const contentApiObj = require("./APIS/contentApi");
const watchlistApiObj = require("./APIS/watchlistApi");
const favouriteApiObj = require("./APIS/favouriteApi");
const feedbackApiObj = require("./APIS/feedbackApi");

const baseURL = process.env.REACT_APP_API_BASE_URL;
// Route Path
app.use("/users", userApiObj);
app.use("/admin", adminApiObj);
app.use("/content", contentApiObj);
app.use("/watchlist", watchlistApiObj);
app.use("/favourite", favouriteApiObj);
app.use("/comment", feedbackApiObj);
// For Refresh
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});
// To connect Mongo db
const mongoClient = require("mongodb").MongoClient;
const dbUrl = process.env.DATABASE_URL;
mongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log("Error in db connect", err);
  } else {
    // Connect to database and collection
    let databaseObject = client.db("videogallery");
    let userCollection = databaseObject.collection("usercollection");
    app.set("userCollection", userCollection);
    let adminCollection = databaseObject.collection("admincollection");
    app.set("adminCollection", adminCollection);
    let contentCollection = databaseObject.collection("contentcollection");
    app.set("contentCollection", contentCollection);
    let watchlistCollection = databaseObject.collection("watchlistcollection");
    app.set("watchlistCollection", watchlistCollection);
    let favouriteCollection = databaseObject.collection("favouritecollection");
    app.set("favouriteCollection", favouriteCollection);
    let feedbackCollection = databaseObject.collection("feedbackcollection");
    app.set("feedbackCollection", feedbackCollection);
    console.log("Connected to DB");
  }
});
// if path not available
app.use((req, res, next) => {
  res.send({ message: `Path ${req.url} not Available` });
});
// error handler
app.use((err, req, res, next) => {
  res.send({ message: "Error Occured", reason: err });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, baseURL, () =>
  console.log(`Server listening on port ${PORT}`)
);
