import Company from "../models/Company.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";
import checkPermisions from "../utils/checkPermisions.js";
const createCompany = async (req, res) => {
  const {
    companyName,
    companyAddress,
    companyEmail,
    companyPhone,
    companyDescription,
    workingHourStart,
    workingHourEnd,
    companyLocation,
    companyCategory,
  } = req.body;
  if (
    !companyName ||
    !companyAddress ||
    !companyEmail ||
    !companyPhone ||
    !companyDescription ||
    !workingHourStart ||
    !workingHourEnd ||
    !companyLocation ||
    !companyCategory
  ) {
    throw new BadRequestError("Please provide all values of company!");
  }
  req.body.createdByUser = req.user.userId;
  const companyCreate = await Company.create(req.body);
  res.status(StatusCodes.CREATED).json({ companyCreate });
};

const getAllMyCompanies = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {
    createdByUser: req.user.userId,
  };

  if (search) {
    queryObject.companyName = { $regex: search, $options: "i" };
  }

  let result = Company.find(queryObject);
  //sort
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("companyName");
  }
  if (sort === "z-a") {
    result = result.sort("-companyName");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const companies = await result;

  const totalCompanies = await Company.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCompanies / limit);

  res.status(StatusCodes.OK).json({ companies, totalCompanies, numOfPages });
};

const getAllCompanies = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.companyName = { $regex: search, $options: "i" };
  }

  let result = Company.find(queryObject);
  //sort
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("companyName");
  }
  if (sort === "z-a") {
    result = result.sort("-companyName");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const companies = await result;

  const totalCompanies = await Company.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCompanies / limit);

  res.status(StatusCodes.OK).json({ companies, totalCompanies, numOfPages });
};

const deleteCompany = async (req, res) => {
  const { id: companyId } = req.params;
  const company = await Company.findOne({ _id: companyId });

  if (!company) {
    throw new NotFoundError(`No job with id :${companyId}`);
  }

  checkPermisions(req.user, company.createdByUser);
  await company.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Company removed!" });
};

const updateCompany = async (req, res) => {
  const { id: companyId } = req.params;
  // const { company, position } = req.body;
  // if (!position || !company) {
  //   throw new BadRequestError("Please provide all values!");
  // }
  const company = await Company.findOne({ _id: companyId });

  if (!company) {
    throw new NotFoundError(`No job with id :${companyId}`);
  }

  checkPermisions(req.user, company.createdByUser);
  const updatedCompany = await Company.findOneAndUpdate(
    { _id: companyId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedCompany });
};

export {
  createCompany,
  getAllMyCompanies,
  getAllCompanies,
  deleteCompany,
  updateCompany,
};
