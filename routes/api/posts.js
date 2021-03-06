const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// POST api/posts
// create post
router.post(
  "/",
  [auth, [check("text", "Text is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      let profile = await Profile.findOne({ user: req.user.id });

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        avatar: profile.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500);
    }
  }
);

// GET api/posts
// get all posts
router.get("/", auth, async (req, res) => {
  try {
    //get newest posts first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500);
  }
});

// GET api/posts/:id
// get post by id
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.status(500);
  }
});

// DELETE api/posts/:id
// Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }
    //check if it's post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized." });
    }
    await post.remove();
    res.json({ msg: "Post removed." });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.status(500).send("Server error.");
  }
});

// PUT api/posts/like/:id
// like a post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if post has been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post has already been liked." });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.status(500).send("Server error.");
  }
});

// PUT api/posts/unlike/:id
// unlike a post
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if post hasn't been liked
    if (
      !post.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post hasn't been liked." });
    }
    //get index to remove
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.status(500).send("Server error.");
  }
});

// POST api/posts/comment/:id
// create comment
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      let profile = await Profile.findOne({ user: req.user.id });

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: profile.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500);
    }
  }
);

// DELETE api/posts/comment/:id/:comment_id
// delete comment
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //find post
    const post = await Post.findById(req.params.id);
    //find comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //does comment exist?
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist." });
    }
    //check if user can delete it
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized." });
    }

    //get remove index
    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    );
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//  PUT api/posts/comment/like/:id/:comment_id
//   Like a comment
router.put("/comment/like/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //check if user already like post
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Comment already liked" });
    }

    comment.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/posts/comment/unlike/:id/:comment_id
// Unlike a comment
router.put("/comment/unlike/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //check if user already like post
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Comment has not been liked yet" });
    }

    //Get remove index
    const removeIndex = comment.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    comment.likes.splice(removeIndex, 1);

    await post.save();

    res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
