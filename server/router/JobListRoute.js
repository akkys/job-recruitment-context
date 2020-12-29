const router = require("express").Router();
const JobList = require("../model/JobModel");
const auth = require("../middleware/Auth");

router.post("/add", auth, async (req, res) => {
  try {
    const {
      companyName,
      position,
      role,
      level,
      location,
      contract,
      languages,
      tools,
      minSalary,
      maxSalary,
      experience,
    } = req.body;

    //validation
    if (
      !companyName ||
      !position ||
      !role ||
      !level ||
      !location ||
      !contract ||
      !languages ||
      !tools ||
      !minSalary ||
      !maxSalary ||
      !experience
    )
      return res
        .status(400)
        .json({ msg: "Not all Fields have been entered. Please check again" });

    const newJobList = new JobList({
      companyName,
      position,
      role,
      level,
      location,
      contract,
      languages,
      tools,
      minSalary,
      maxSalary,
      experience,
      userId: req.user,
    });

    const savedJobList = await newJobList.save();
    res.json(savedJobList);
    res.json({ msg: "Job Added Successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const jobLists = await JobList.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (jobLists) {
      jobLists.companyName = req.body.companyName;
      jobLists.position = req.body.position;
      jobLists.role = req.body.role;
      jobLists.level = req.body.level;
      jobLists.location = req.body.location;
      jobLists.contract = req.body.contract;
      jobLists.languages = req.body.languages;
      jobLists.tools = req.body.tools;
      jobLists.minSalary = req.body.minSalary;
      jobLists.maxSalary = req.body.maxSalary;
      jobLists.experience = req.body.experience;
      // jobLists.userId = req.userId;
    }

    const updatedJobList = await jobLists.save();
    res.json(updatedJobList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const jobLists = await JobList.find({ userId: req.user });
  res.json(jobLists);
});

router.get("/all", async (req, res) => {
  const jobLists = await JobList.find();
  res.json(jobLists);
});

router.get("/:id", auth, async (req, res) => {
  const jobLists = await JobList.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(jobLists);
});

router.delete("/:id", auth, async (req, res) => {
  const jobList = await JobList.findOne({
    userId: res.user,
    _id: req.params.id,
  });
  // if (!jobList)
  //   res.status(400).json({ msg: "No Todo found with this userId." });
  const deletedJob = await JobList.findByIdAndDelete(req.params.id);
  res.json(deletedJob);
});

module.exports = router;
