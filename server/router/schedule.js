const router = require("express").Router();
const auth = require("../middleware/Auth");
let Schedule = require("../model/schedule.model");

// router.route("/").get(auth, (req, res) => {
//   Schedule.find({ userId: req.user })
//     .then((schedule) => res.json(schedule))
//     .catch((err) => console.log(err));
// });

router.get("/", auth, async (req, res) => {
  const interviewData = await Schedule.find({ userId: req.user });
  res.json(interviewData);
});

router.post("/add", auth, async (req, res) => {
  try {
    const { name, email, date, interviewer, inttype, status } = req.body;

    if (!name || !interviewer || !email || !date || !inttype || !status)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newInterview = new Schedule({
      name,
      email,
      date,
      interviewer,
      inttype,
      status,
      userId: req.user,
    });

    const savedInterview = await newInterview.save();
    res.json(savedInterview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  const interviewData = await Schedule.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(interviewData);
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (schedule) {
      (schedule.name = req.body.name),
        (schedule.date = Date.parse(req.body.date)),
        (schedule.email = req.body.email),
        (schedule.interviewer = req.body.interviewer),
        (schedule.inttype = req.body.inttype);
      schedule.status = req.body.status;
    }

    const updatedInterview = await schedule.save();
    res.json(updatedInterview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const interviewData = await Schedule.findOne({
    userId: res.user,
    _id: req.params.id,
  });

  const deletedInterview = await Schedule.findByIdAndDelete(req.params.id);
  res.json(deletedInterview);
});

module.exports = router;
