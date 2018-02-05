var express = require("express");
var app = express();
var config = require("./config");
var base58 = require("./base58.js");
var mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

var port = process.env.PORT || 3000;

// let db;
// MongoClient.connect("mongodb://localhost:27017", (err, client) => {
//   if (err) return console.log(err);
//   db = client.db("url-shortner-db");
//   app.listen(3000, () => {
//     console.log("listening on 3000");
//   });
// });

// grab the url model
var Url = require("./models/url");
var baseURL = "http://localhost:3000/";

mongoose.connect("mongodb://" + config.db.host + "/" + config.db.name);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/:url(*)", function(req, res) {
  var longUrl = req.params.url;
  var shortUrl = "";
  if (!isURL(longUrl)) return res.send({ Status: "Not a valid URL" });

  Url.findOne({ long_url: longUrl }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      shortUrl = baseURL + base58.encode(doc._id);
      res.send({ shortUrl: shortUrl });
    } else {
      var newUrl = Url({
        long_url: longUrl
      });

      newUrl.save(function(err) {
        if (err) {
          console.log(err);
        }
        shortUrl = baseURL + base58.encode(newUrl._id);
        res.send({ originalUrl: longUrl, shortUrl: shortUrl });
      });
    }
  });
});

app.get("/:url", function(req, res) {
  var base58Id = req.params.url;
  var id = base58.decode(base58Id);
  Url.findOne({ _id: id }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });
});

var server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});

// Credit to http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
// Created by Diogo Cardoso, and Zemljoradnik
function isURL(str) {
  var pattern = new RegExp(
    "(http|ftp|https)://[w-]+(.[w-]+)+([w.,@?^=%&amp;:/~+#-]*[w@?^=%&amp;/~+#-])?"
  );
  return pattern.test(str);
}
// app.post("/quotes", (req, res) => {
//   db.collection("quotes").save(req.body, (err, result) => {
//     if (err) return console.log(err);

//     console.log("saved to database");
//     res.redirect("/");
//   });
// });
