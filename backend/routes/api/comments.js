const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  setTokenCookie,
  requireAuth,
  userExtractor,
} = require("../../utils/auth");
const { Comment, Feedback } = require("../../db/models");
const { check } = require("express-validator");
const { Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");

const validateComment = [
  check("content")
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
  const { body, user } = req;
  const feedback = await Feedback.findByPk(req.params.id);
    const { content } = req.body;
    const comment = await Comment.create({
      content: content,
      FeedbackId: feedback.id,
      UserId: req.user.id,
    });
    return res.json({
      comment,
    });
})
);
router.delete("/:id",
userExtractor,
asyncHandler(async (req, res) => {
  const { user } = req.user;
  const comment = await Comment.findByPk(req.params.id);
    if (comment.UserId !== req.user.id) {
      return res
        .status(401)
        .json({ error: "Only the owner can delete Comments" });
    }
    await comment.destroy();
    return res.status(204).end();
})
);
module.exports= router;