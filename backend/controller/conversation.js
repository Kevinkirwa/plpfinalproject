const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const router = express.Router();

// create a new conversation
router.post(
  "/create-new-conversation",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      if (!userId || !sellerId) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      // Check if conversation exists
      const isConversationExist = await Conversation.findOne({ groupTitle });

      if (isConversationExist) {
        return res.status(200).json({
          success: true,
          conversation: isConversationExist,
        });
      }

      // Create new conversation
      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
        lastMessage: "",
        lastMessageId: null
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      console.error("Conversation creation error:", error);
      return next(new ErrorHandler(error.message || "Error creating conversation", 500));
    }
  })
);

// get seller conversations
router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);


// get user conversations
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);

// update the last message
router.put(
  "/update-last-message/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);

module.exports = router;
