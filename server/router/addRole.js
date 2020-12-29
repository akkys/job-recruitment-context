const router = require("express").Router();
let AddRole = require("../model/addRole.model");

router.route("/").get((req, res) => {
  AddRole.find()
    .then((addRole) => res.json(addRole))
    .catch((err) => console.log(err));
});

router.route("/add").post((req, res) => {
  const role = req.body.role;

  const newRole = new AddRole({ role });

  newRole
    .save()
    .then(() => console.log("Roll Added!"))
    .catch((err) => console.log(err));
});

module.exports = router;
