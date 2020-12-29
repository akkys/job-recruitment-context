const router = require("express").Router();
const Experience = require("../model/addExperienceModel");
const auth = require("../middleware/Auth");

router.post("/add", auth, async (req, res) => {
  try {
    const { cmpName, role, description, fromDate, toDate } = req.body;

    if (!cmpName || !role || !description || !fromDate || !toDate) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const newExperience = new Experience({
      cmpName,
      role,
      description,
      fromDate,
      toDate,
      userId: req.user,
    });

    const savedExperinece = await newExperience.save();
    res.json(savedExperinece);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const experienceData = await Experience.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (experienceData) {
      experienceData.cmpName = req.body.cmpName;
      experienceData.role = req.body.role;
      experienceData.description = req.body.description;
      experienceData.fromDate = req.body.fromDate;
      experienceData.toDate = req.body.toDate;
    }

    const updatedExperince = await experienceData.save();
    res.json(updatedExperince);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const experienceData = await Experience.find({ userId: req.user });
  res.json(experienceData);
});

router.get("/:id", auth, async (req, res) => {
  const experienceData = await Experience.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(experienceData);
});

router.delete("/:id", auth, async (req, res) => {
  const experienceData = await Experience.findOne({
    userId: res.user,
    _id: req.params.id,
  });
  // if (!experienceData)
  //   res.status(400).json({ msg: "No Todo found with this userId." });
  const deletedExperince = await Experience.findByIdAndDelete(req.params.id);
  res.json(deletedExperince);
});

module.exports = router;
