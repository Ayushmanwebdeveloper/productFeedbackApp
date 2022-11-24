const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const{ check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup=[
check('email')
.exists({checkFalsy:true})
.isEmail()
.withMessage('Please provide a valid email.'),
check('username')
.exists({checkFalsy:true})
.isLength({min:4})
.withMessage('Please provide a username with at least 4 characters.'),
check('password')
.exists({checkFalsy:true})
.isLength({min:6})
.withMessage('Please provide a password with at least 6 characters.'),
handleValidationErrors
]

const router = express.Router();
// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, avatar } = req.body;
    const user = await User.signup({ email, username, password, avatar });
    await setTokenCookie(res, user);
    return res.json({
      user
    });
  })
);

module.exports= router;