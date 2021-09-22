const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
app.use(express.static(path.join(__dirname, "./build")));
const userApiObj = require("./APIS/userApi");
const adminApiObj = require("./APIS/adminApi");
const contentApiObj = require("./APIS/contentApi");
const watchlistApiObj = require("./APIS/watchlistApi");
const favouriteApiObj = require("./APIS/favouriteApi");
const feedbackApiObj = require("./APIS/feedbackApi");
app.use("/users", userApiObj);
app.use("/admin", adminApiObj);
app.use("/content", contentApiObj);
app.use("/watchlist", watchlistApiObj);
app.use("/favourite", favouriteApiObj);
app.use("/comment", feedbackApiObj);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});
const mongoClient = require("mongodb").MongoClient;
const dbUrl = process.env.DATABASE_URL;
mongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log("Error in db connect", err);
  } else {
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
  console.log(err);
  res.send({ message: "Error Occured", reason: err.message });
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
