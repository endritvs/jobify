import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    //id e job
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: [true, "Please provide job"],
    },
    // id e user
    applyByUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("JobApplication", JobApplicationSchema);
