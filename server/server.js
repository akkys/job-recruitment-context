const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = "mongodb://localhost:27017/jobDB";

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected!"))
  .catch((err) => console.log(err));

const cmpRegRouter = require("./router/cmpReg");
const addTeamRouter = require("./router/addTeam");
const addRoleRouter = require("./router/addRole");
const scheduleRouter = require("./router/schedule");
const intTypeRouter = require("./router/interviewTypes");
const userRoute = require("./router/userRoute");
const jobListRoute = require("./router/JobListRoute");
const candidateProfileRoute = require("./router/candidateProfileRoute");
const candidateExperienceRoute = require("./router/addExperienceRoute");
const candidateProjectRoute = require("./router/addProjectRoute");

app.use("/user", userRoute);
app.use("/cmpReg", cmpRegRouter);
app.use("/addTeam", addTeamRouter);
app.use("/addRole", addRoleRouter);
app.use("/schedule", scheduleRouter);
app.use("/intType", intTypeRouter);
app.use("/jobList", jobListRoute);
app.use("/candidate", candidateProfileRoute);
app.use("/experience", candidateExperienceRoute);
app.use("/projects", candidateProjectRoute);

app.listen(port, () => {
  console.log(`Server is running at PORT : ${port}`);
});
