const express = require("express");
const pincode = require("../utils/pincode");
const hbs = require("hbs");
const path = require("path");
const districtData = require("../utils/district");

const app = express();
const pathDirectory = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
app.set("view engine", "hbs");
app.use(express.static(pathDirectory));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/pincode", (req, res) => {
  res.render("pincode");
});
app.get("/district", (req, res) => {
  res.render("district");
});

app.get("/disdata", (req, res) => {
  //console.log(req.query);
  const state = req.query.state;
  const district = req.query.district;
  var today = req.query.date;
  today = today.split("-").reverse().join("-");
  //console.log(today);
  if (!state) {
    return res.send({
      error: "Enter a valid Location",
    });
  } else {
    districtData(state, district, today, (error, forecastData) => {
      if (error) {
        return res.send(error);
      } else if (forecastData.error) {
        return res.send({
          error: forecastData.error,
        });
      }
      return res.send(forecastData);
    });
  }
});

app.get("/pindata", (req, res) => {
  // console.log(req.query);
  const location = req.query.pincode;
  var today = req.query.date;
  today = today.split("-").reverse().join("-");

  if (!location) {
    return res.send({
      error: "Enter a valid Location",
    });
  } else {
    pincode(location, today, (error, forecastData) => {
      if (error) {
        return res.send(error);
      } else if (forecastData.error) {
        return res.send({
          error: forecastData.error,
        });
      }
      return res.send(forecastData);
    });
  }
});

app.listen(port, () => {
  console.log("Successfully listening on port ", port);
});
