var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");
const sgMail = require("@sendgrid/mail");

var Schema = mongoose.Schema;
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/dist/dscBug"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );
  next();
});

mongoose.connect(process.env.ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
var questionSchema = Schema({
  questionNo: Number,
  question: String,
  score: Number,
  answer: String,
  password: String,
});
var teamSchema = Schema({
  email: String,
  teamNo: Number,

  teamName: String,
  cScore: {
    type: Number,
    default: 0,
  },
  webScore: {
    type: Number,
    default: 0,
  },

  totalScore: {
    type: Number,
    default: 0,
  },
  solved: {
    arr : [],
    dateTime : [],
    webdatetime:Date
  },
});

var Teams = mongoose.model("Teams", teamSchema);
var Questions = mongoose.model("Questions", questionSchema);


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.get("/getTeams", (req, res) => {
  Teams.find({}, function (err, foundTeams) {
    if (err) console.log(err);
    else {
      res.json(foundTeams);
    }
  });
});

router.get("/questions", (req, res) => {
  Questions.find({}, function (err, foundQues) {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json({ arr: foundQues });
    }
  });
});

router.post("/changeScore", (req, res) => {
  Teams.findOne({ teamNo: req.body.teamNo }, function (err, foundTeam) {
    if (foundTeam) {
      Questions.findOne(
        { question: req.body.question.question },
        async function (err, foundQues) {
          if (foundQues) {
            foundTeam.solved['arr'][foundQues.questionNo - 1] = 1;
            foundTeam.solved['dateTime'][foundQues.questionNo - 1] = new Date();
            foundTeam.cScore += foundQues.score;
            foundTeam.totalScore += foundQues.score;
            foundTeam.markModified("solved");

            await foundTeam.save(function (err, savedTeam) {
              if (err) console.log(err);
              else {
                res.json(savedTeam);
              }
            });
          }
        }
      );
    } else {
      console.log(err);
    }
  });
});
router.post("/addQuestion", (req, res) => {
  Questions.findOne({ questionNo: req.body.questionNo }, function (
    err,
    foundQuestion
  ) {
    if (foundQuestion) {
      res.json({ error: true, message: "The question is already added" });
    } else {
      Questions.create(req.body, function (err, createdQuestion) {
        if (err) console.log(err);
        else {
          res.json({
            error: false,
            message: "The question has been successfully added",
          });
        }
      });
    }
  });
});
router.put("/teams/editScore", (req, res) => {
  Teams.findOne({ _id: req.body.id }, async function (err, foundTeam) {
    if (foundTeam) {
      foundTeam.webScore += req.body.webScore;
      foundTeam.solved['webdatetime']=req.body.date;
      foundTeam.totalScore += req.body.webScore;
      await foundTeam.save(function (err, savedTeam) {
        if (err) {
          res.json({
            error: "true",
            message:
              "the web score is not updated due to some issues! Please try again!!",
          });
          console.log(err);
        } else {
          res.json({
            error: "false",
            message: "the web score has been updated",
          });
        }
      });
    } else {
      res.json({
        error: "true",
        message:
          "the web score is not updated due to some issues! Please try again!!",
      });
      console.log(err);
    }
  });
});
router.post("/teams/register", (req, res) => {
  Teams.findOne({ teamNo: req.body.teamNo }, function (err, foundTeam) {
    if (foundTeam) {
      res.json({ error: "true", message: "the team is already registered" });
    } else {
      Questions.find({}, function (err, arr) {
        solvedArr = [];
        dateTimeArr = [];
        arr.forEach((ques) => {
          solvedArr.push(0);
          dateTimeArr.push(new Date());
        });

        let m = {
          teamNo: req.body.teamNo,

          teamName: req.body.teamName,
          email: req.body.email,

          solved: {
            arr : solvedArr,
            dateTime : dateTimeArr,
            webdatetime:dateTimeArr[0]
          },
        };
        Teams.create(m, function (err, createdTeam) {
          if (err) {
            console.log(err);
          } else {
            const msg = {
              to: createdTeam.email,
              from: "shivansh.cv12@gmail.com",
              subject: "Team ID For DSC-BUG Bounty 2020",
              text:
                "Hello Team " +
                createdTeam.teamName +
                "\nYour Team Id is " +
                createdTeam.teamNo,
            };
            sgMail.send(msg);

            res.json({
              error: false,
              message: "the team is successfully registered",
              teamName: createdTeam.teamName,
            });
          }
        });
      });
    }
  });
});

router.post("/team/login", (req, res) => {
  Teams.findOne({ teamNo: req.body.teamNo }, function (err, foundTeam) {
    if (foundTeam) {
      let m = {
        error: false,
        team: {
          teamNo: foundTeam.teamNo,
          solved: foundTeam.solved,
          teamName: foundTeam.teamName,
        },
      };
      res.json(m);
    } else {
      res.json({ error: true, message: "Invalid Credentials" });
    }
  });
});

router.post("/admin_login", (req, res) => {
  if (req.body.username == "helloDSC" && req.body.password == "helloAdmin") {
    res.json({ error: "false" });
  } else {
    res.json({ error: "true" });
  }
});

app.use("/api", router);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/dscBug/index.html"));
});

app.listen(process.env.PORT, function () {
  console.log("SERVER RUNNING ON PORT " + process.env.PORT);
});
