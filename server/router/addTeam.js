const router = require("express").Router();
let Team = require("../model/addTeam.model");
const auth = require("../middleware/Auth");

router.post("/add", auth, async (req, res) => {
  try {
    const { name, role, email, phone } = req.body;

    if (!name || !role || !email || !phone)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newTeam = new Team({
      name,
      role,
      email,
      phone,
      userId: req.user,
    });

    const savedTeam = await newTeam.save();
    res.json(savedTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/:id").delete((req, res) => {
  Team.findByIdAndDelete(req.params.id)
    .then(() => console.log("Member Deleted!"))
    .catch((err) => console.log(err));
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const teamData = await Team.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (teamData) {
      teamData.name = req.body.name;
      teamData.role = req.body.role;
      teamData.email = req.body.email;
      teamData.phone = req.body.phone;
    }

    const updatedTeam = await teamData.save();
    res.json(updatedTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const teamData = await Team.find({ userId: req.user });
  res.json(teamData);
});

router.get("/:id", auth, async (req, res) => {
  const teamData = await Team.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(teamData);
});

router.delete("/:id", auth, async (req, res) => {
  const teamData = await Team.findOne({
    userId: res.user,
    _id: req.params.id,
  });

  const deletedTeam = await Team.findByIdAndDelete(req.params.id);
  res.json(deletedTeam);
});

module.exports = router;
