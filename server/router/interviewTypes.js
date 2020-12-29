const router = require("express").Router();
const auth = require("../middleware/Auth");
let InterviewTypes = require("../model/InterviewTypes.model");

router.route("/").get((req, res) => {
  InterviewTypes.find()
    .then((inttypes) => res.json(inttypes))
    .catch((err) => console.log(err));
});

router.route("/add").post((req, res) => {
  const inttype = req.body.inttype;

  const newInttype = new InterviewTypes({ inttype });

  newInttype
    .save()
    .then(() => console.log("Interview Type Added"))
    .catch((err) => console.log(err));
});

router.route("/:id").delete((req, res) => {
  InterviewTypes.findByIdAndDelete(req.params.id)
    .then(() => console.log("Deleted"))
    .catch((err) => console.log(err));
});

module.exports = router;
