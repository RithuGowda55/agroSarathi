const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Post");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to create a new post
router.post("/create", upload.single("img"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      img: req.file ? req.file.path : null, // store image path if available
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get a single post by ID
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Route to get a single post by ID
// Get a single post by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    // Ensure the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
  
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  // Route to update a post by ID
  router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // Update only the provided fields
        },
        { new: true } // Return the updated document
      );
      if (!post) {
        return res.status(404).json("Post not found");
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Route to delete a post by ID
  router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json("Post not found");
      }
      res.status(200).json("Post deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  

module.exports = router;
