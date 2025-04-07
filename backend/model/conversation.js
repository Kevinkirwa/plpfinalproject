const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupTitle: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
