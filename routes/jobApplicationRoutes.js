import express from "express";
const router = express.Router();
import {
  createJobApplication,
  getAllMyApplications,
  deleteJobApplication,
  whoAppliedMyJobs,
  deleteWhoAppliedMyJobs,
  getAllApplications,
} from "../controllers/jobApplication.js";

router.route("/").post(createJobApplication);
router.route("/jobApplications").get(getAllMyApplications);
router.route("/whoAppliedMyJobs").get(whoAppliedMyJobs);
router.route("/getAllApplications").get(getAllApplications);
router.route("/:id").delete(deleteJobApplication);
router.route("/:id").delete(deleteWhoAppliedMyJobs);

export default router;
