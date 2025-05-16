const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    description: { type: String, default: "" },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);