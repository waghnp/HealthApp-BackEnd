const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors')
const users = require("./routes/api/users");
const labs= require("./routes/api/labs");
const reports = require("./routes/api/reports");

const app = express();// Bodyparser middleware

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors())

app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
const { report } = require("./routes/api/labs");
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/labs",labs);
app.use("/api/reports",reports);

  const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app thereapp.listen(port, () => console.log(`Server up and running on port ${port} !`));

  app.listen(port, () => console.log(`Server up and running on port ${port} !`));