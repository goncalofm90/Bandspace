const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// POST api/users
router.post(
  "/",
  //validator logic
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Please use a valid email.").isEmail(),
    check("password", "Password should have at least 6 characters").isLength({
      min: 6,
    }),
  ],
  //requests
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
    }
    res.send("user request sent");
  }
);

module.exports = router;
