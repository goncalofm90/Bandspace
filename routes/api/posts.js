const express = require("express");
const router = express.Router();

// GET api/posts
// public
router.get("/", (req, res) => res.send("posts route"));

module.exports = router;
