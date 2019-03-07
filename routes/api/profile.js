const express = require('express');
const router = express.Router();

// This is the API call, so we dont include the route specified in server.js
// so this call will send us to whatever app.use that corresponds to this users file
// meaning /api/users/{API_CALL}

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "profile works"}));


module.exports = router;