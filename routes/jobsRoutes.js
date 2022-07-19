import express from "express";
const router = express.Router();
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  getAllJobsAllUsers,
  getJob,
} from "../controllers/jobsController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/find-job").get(getAllJobsAllUsers);
router.route("/job/:id").get(getJob);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
