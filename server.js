const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const dotenv = require("dotenv");
// ---------------------------------
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const likeRoute = require("./routes/likes");
const commentRoute = require("./routes/comments");
// ---------------------------------
const auth = require("./middlewares/auth");
// ---------------------------------

app.use(express.json());
app.use(cors());
app.use(helmet());
dotenv.config();
//? --------------------------------
app.use("/api/user", userRoute);
//? --------------------------------
app.use("/api/post", auth, postRoute);
//? --------------------------------
app.use("/api/like", likeRoute);
//? --------------------------------
app.use("/api/comment", commentRoute);
//? --------------------------------

app.use("/", async (req, res) => {
  try {
    res.status(200).json("I work just fine");
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//
app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

//
// gestionnaire de routage
app.use("/images", express.static(path.join(__dirname, "images")));
//
//
const models = require("./models");
models.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5500, () => {
    console.log("===> Backend server is running! <===");
  });
});
