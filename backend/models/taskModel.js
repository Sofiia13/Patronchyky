const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 1000,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // тип даних (точка)
      required: true,
    },
    coordinates: {
      type: [Number], // масив чисел [довгота, широта]
      required: true,
    },
  },
  priority: {
    type: String,
    enum: ["Urgent", "Default"],
    default: "Default",
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
