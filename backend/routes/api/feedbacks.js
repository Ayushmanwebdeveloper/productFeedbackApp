const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Feedback } = require("../../db/models");
const{ check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");

const validateFeedback=[
check('title')
.exists({checkFalsy:true})
.isLength({min:2})
.withMessage('Please provide a title with at least 2 characters.'),
check('category')
.exists({checkFalsy:true}),
check('status')
.exists({checkFalsy:true}),
check('description')
.exists({checkFalsy:true})
.isLength({min:10})
.withMessage('Please provide a description with at least 10 characters.'),
];

router.get(
    '/',
    asyncHandler(async (req, res) => {
      const feedback = await Feedback.findAll();
      return res.json({
        feedback
      });
    })
  );

  router.post(
    '/',
    validateFeedback,
    asyncHandler(async (req, res) => {
      const { title, category, status, description, upvotes, userId } = req.body;
      const feedback = await Feedback.add({ title, category, status, description, upvotes, userId });
      return res.json({
        feedback
      });
    })
  ); 
  module.exports= router;