import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermisions from "../utils/checkPermisions.js";
import mongoose from "mongoose";

import moment from "moment";

const createJobApplication = async (req, res) => {
  const { jobId } = req.body;

  const job = Job.findOne(jobId);
  if (!job) {
    throw new BadRequestError("Job not found!");
  }
  req.body.applyByUser = req.user.userId;

  const JobApplicationCreate = await JobApplication.create(req.body);
  res.status(StatusCodes.CREATED).json({ JobApplicationCreate });
};

const getAllMyApplications = async (req, res) => {
  const queryObject = {
    applyByUser: req.user.userId,
  };

  let result = JobApplication.aggregate([
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "job",
      },
    },
    {
      $match: {
        applyByUser: new mongoose.Types.ObjectId(queryObject.applyByUser),
      },
    },
  ]);
  // console.log(result);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobApplications = await JobApplication.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobApplications / limit);

  res.status(StatusCodes.OK).json({
    jobApplications: jobs,
    totalJobApplications,
    numOfPages,
  });
};

const whoAppliedMyJobs = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };

  let result = JobApplication.aggregate([
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              createdBy: new mongoose.Types.ObjectId(queryObject.createdBy),
            },
          },
        ],

        as: "job",
      },
    },
    {
      $match: {
        job: { $ne: [] },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "applyByUser",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);

  const allMyApplicants = await result;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  // const totalJobApplications = jobs.length;
  const totalJobApplications = allMyApplicants.length;
  const numOfPages = Math.ceil(totalJobApplications / limit);

  res.status(StatusCodes.OK).json({
    applicants: jobs,
    totalJobApplications,
    numOfPages,
  });
};

const getAllApplications = async (req, res) => {
  const queryObject = {};

  let result = JobApplication.aggregate([
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        pipeline: [
          {
            $match: {},
          },
        ],

        as: "job",
      },
    },
    {
      $match: {
        job: { $ne: [] },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "applyByUser",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);

  const allApplicants = await result;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  // const totalJobApplications = jobs.length;
  const totalJobApplications = allApplicants.length;
  const numOfPages = Math.ceil(totalJobApplications / limit);

  res.status(StatusCodes.OK).json({
    applicants: jobs,
    totalJobApplications,
    numOfPages,
  });
};

const deleteJobApplication = async (req, res) => {
  const { id: jobApplicationId } = req.params;
  const jobApplication = await JobApplication.findOne({
    _id: jobApplicationId,
  });

  if (!jobApplication) {
    throw new NotFoundError(
      `No job application found with id :${jobApplicationId}`
    );
  }

  checkPermisions(req.user, jobApplication.applyByUser);
  await jobApplication.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Your job application removed!" });
};

const deleteWhoAppliedMyJobs = async (req, res) => {
  const { id: jobApplicationId } = req.params;
  const jobApplication = await JobApplication.findOne({
    _id: jobApplicationId,
  });

  if (!jobApplication) {
    throw new NotFoundError(
      `No job application found with id :${jobApplicationId}`
    );
  }

  checkPermisions(req.user, jobApplication.applyByUser);
  await jobApplication.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Your job application removed!" });
};

export {
  createJobApplication,
  getAllMyApplications,
  deleteJobApplication,
  whoAppliedMyJobs,
  deleteWhoAppliedMyJobs,
  getAllApplications,
};
