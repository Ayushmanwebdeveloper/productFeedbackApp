const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { Comment, Reply } = require("../../db/models");
const {userExtractor} = require("../../utils/auth");
const { check } = require("express-validator");

router.get("/",
asyncHandler(async (req, res) => {
    const replies = await Reply.findAll();
    return res.json({
        replies,
    });
})
);

router.get("/:id",
asyncHandler(async (req, res) => {
    const replies = await Reply.findByPk(req.params.id);
    return res.json({
        replies,
    });
})
);
router.post("/:id",
userExtractor,
asyncHandler(async (req, res) => {
    const { body, user } = req;
    const comment = await Comment.findByPk(req.params.id);
    const { content } = req.body;
    const reply = await Reply.create({
        content: content,
        CommentId: comment.id,
        UserId: req.user.id,
    });

    return res.json({
        reply,
    });
})
);
router.delete("/:id",
userExtractor,
asyncHandler(async (req, res) => {
    const { user } = req.user;
    const reply = await Reply.findByPk(req.params.id);
    if (reply.UserId !== req.user.id) {
        return res
        .status(401)
        .json({ error: "Only the owner can delete Replies" });
    }
    await reply.destroy();
    return res.status(204).end();
})
);


module.exports= router;