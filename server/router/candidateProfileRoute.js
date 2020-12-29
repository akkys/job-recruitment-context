const router = require("express").Router();
const Candidate = require("../model/candidateModal");
const auth = require("../middleware/Auth");

router.post("/add", auth, async (req, res) => {
  try {
    const { name, userName, miniResume, skills, roles, locations } = req.body;

    if (!name || !userName || !miniResume || skills || !roles || !locations) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const candidateProfile = new Candidate({
      name,
      userName,
      miniResume,
      skills,
      roles,
      locations,
      userId: req.user,
    });
    const savedProfile = await candidateProfile.save();
    res.json(savedProfile);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const candidateProfile = await Candidate.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (candidateProfile) {
      candidateProfile.name = req.body.name;
      candidateProfile.userName = req.body.userName;
      candidateProfile.miniResume = req.body.miniResume;
      candidateProfile.skills = req.body.skills;
      candidateProfile.roles = req.body.roles;
      candidateProfile.locations = req.body.locations;
    }
    const updateProfile = await candidateProfile.save();
    res.json(updateProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const candidateProfileData = await Candidate.find({ userId: req.user });
    res.json(candidateProfileData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  const candidateProfile = await Candidate.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(candidateProfile);
});

router.delete("/:id", auth, async (req, res) => {
  const candidateProfile = await Candidate.findOne({
    userId: res.user,
    _id: req.params.id,
  });
  if (!candidateProfile)
    res.status(400).json({ msg: "No User found with this userId." });
  const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
  res.json(deletedCandidate);
});

module.exports = router;
