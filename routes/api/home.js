const express = require('express');
const router = express.Router();


// @route   GET '/'
// @desc    Home page
// @access  Public

// HTTP Router call: router.{HTTP CALL}({endpoint}, (req, res) => Do a thing in the function
router.get('/', (req, res) => (res.json({msg: "Hello from home"})));


module.exports = router;