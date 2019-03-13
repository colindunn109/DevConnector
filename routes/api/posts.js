const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const validatePostInput = require('../../validation/post');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "posts works"}));


// @route   GET api/posts
// @desc    gets a post
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noPostsFound: "There are no Posts "}));
});

// @route   GET api/posts/:post_id
// @desc    get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ noPostFound: "There is no post by this ID" }));
});

// @route   POST api/posts
// @desc    Creates a post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Validate Post
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post));
});

// @route   DELETE /api/post/:post_id
// @desc    delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }) , (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: "User is not authorized" })
            }

            post.remove().then((post) => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: "There is no post by this id" }))
    })
});

// @route   POST /api/post/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }) , (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: "User already liked this post" });
            }

            // Add id to the likes array
            post.likes.unshift({ user: req.user.id });
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "There is no post by this id" }))
    })
});

// @route   POST /api/post/unlike/:id
// @desc    unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ notliked: "You havnt liked this post" });
            }

            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "There is no post by this id" }))
    })
});

// @route   POST /api/post/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Validate Post
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id).then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        // Add to comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found"}));
});

// @route   DELETE /api/post/comment/:id/:comment_id
// @desc    delete comment on a post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.id).then(post => {
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(404).json({ commentnotfound: "There is no comment"})
        }

        const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found"}));
});

module.exports = router;