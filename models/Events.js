import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "Users",
  },
  event: { 
    required: true,
    type: [mongoose.Schema.Types.Mixed] 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const eventsModel = mongoose.model("events", eventsSchema);
