const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  setTokenCookie,
  requireAuth,
  userExtractor,
} = require("../../utils/auth");
const { Comment } = require("../../db/models");
const { check } = require("express-validator");
const { Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
module.exports = router;
const validateComment = [
  check("comment")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Please provide a comment with at least 2 characters."),
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const comment = await Comment.findAll();
    return res.json({
      comment,
    });
  })
);

router.post(
  "/:id",
  userExtractor,
  validateComment,
  asyncHandler(async (req, res) => {
    const { title, category, status, description, upvotes, user } = req.body;
    const feedback = await Feedback.add({
      title,
      category,
      status,
      description,
      upvotes,
      UserId: req.user.id,
    });
    return res.json({
      feedback,
    });
  })
);