const router = require("express").Router();
let CmpReg = require("../model/cmpReg.model");
const auth = require("../middleware/Auth");

// router.route("/").get(auth, (req, res) => {
//   CmpReg.find({ userId: req.user })
//     .then((cmpReg) => res.json(cmpReg))
//     .catch((err) => console.log(err));
// });

router.get("/", auth, async (req, res) => {
  const companyData = await CmpReg.find({ userId: req.user });
  res.json(companyData);
});

router.post("/add", auth, async (req, res) => {
  try {
    const {
      fullname,
      email,
      category,
      street1,
      street2,
      city,
      state,
      country,
      zipcode,
    } = req.body;

    if (
      !fullname ||
      !email ||
      !category ||
      !street1 ||
      !street2 ||
      !city ||
      !state ||
      !country ||
      !zipcode
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newCompany = new CmpReg({
      fullname,
      email,
      category,
      street1,
      street2,
      city,
      state,
      country,
      zipcode,
      userId: req.user,
    });

    const savedCompany = await newCompany.save();
    res.json(savedCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/:id").get(auth, (req, res) => {
  CmpReg.findById(req.params.id)
    .then((cmpReg) => res.json(cmpReg))
    .catch((err) => console.log(err));
});

router.route("/:id").delete(auth, (req, res) => {
  CmpReg.findByIdAndDelete(req.params.id)
    .then(() => console.log("Company Deleted!"))
    .catch((err) => console.log(err));
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const companyData = await CmpReg.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (companyData) {
      companyData.fullname = req.body.fullname;
      companyData.email = req.body.email;
      companyData.category = req.body.category;
      companyData.street1 = req.body.street1;
      companyData.street2 = req.body.street2;
      companyData.city = req.body.city;
      companyData.state = req.body.state;
      companyData.country = req.body.country;
      companyData.zipcode = req.body.zipcode;
    }

    const updatedCompany = await companyData.save();
    res.json(updatedCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
