const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 1. GET ALL POSTS (Fetch Latest Posts for Feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. CREATE NEW POST (Drop Roast Target)
router.post('/create', async (req, res) => {
  try {
    const { author, promptText, mediaType, mediaUrl } = req.body;

    if (!promptText) {
      return res.status(400).json({ success: false, message: 'Prompt text is required' });
    }

    const newPost = new Post({
      author: author || '@YourHandle',
      promptText,
      mediaType: mediaType || 'none',
      mediaUrl: mediaUrl || ''
    });

    const savedPost = await newPost.save();
    res.status(201).json({ success: true, post: savedPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. REACT TO POST (Flame 🔥 or Skull 💀)
router.post('/:id/react', async (req, res) => {
  try {
    const { type } = req.body; // 'flame' or 'skull'
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (type === 'flame') {
      post.flamesCount += 1;
    } else if (type === 'skull') {
      post.skullsCount += 1;
    }

    await post.save();
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
