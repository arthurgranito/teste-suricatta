const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    description: { type: String, default: "" },
    checked: { type: Boolean, default: false },
    proofFile: { type: Buffer, default: null },
    proofFileType: { type: String, default: null },
    proofFileName: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);