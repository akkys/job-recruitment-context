const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Auth");
const User = require("../model/UserModal");

router.post("/register", async (req, res) => {
  try {
    let { name, cmpName, email, password, passwordCheck, category } = req.body;

    //validation
    // if (!name || !email || !password || !passwordCheck) {
    //   return res.status(400).json({ msg: "Not all fields have been entered" });
    // }
    if (!name) return res.status(400).json({ msg: "Please enter name" });
    // if (!cmpName)
    //   return res.status(400).json({ msg: "Please enter Company name" });
    if (!email) return res.status(400).json({ msg: "Please enter email" });
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password length must be greater than 5 characters" });
    }
    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Both password must be same." });
    if (!category)
      return res.status(400).json({ msg: "Please select category" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        msg:
          "The account with this Id is already existed. Please try something else",
      });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      name,
      cmpName,
      category,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    // if (!email || !password)
    //   return res.status(400).json({ msg: "Please Enter all fields" });
    if (!email)
      return res.status(400).json({ msg: "Please enter registered email" });
    if (!password)
      return res.status(400).json({ msg: "Please enter valid password" });
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        cmpName: user.cmpName,
        category: user.category,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      name: user.name,
      cmpName: user.cmpName,
      id: user._id,
      category: user.category,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
