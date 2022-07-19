import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import checkPermisions from "../utils/checkPermisions.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      password: user.password,
      role: user.role,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  // console.log(user);

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const getAllUsers = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = User.find(queryObject);
  //sort
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const users = await result;

  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id :${userId}`);
  }

  await user.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! User removed!" });
};

const updateUserAdmin = async (req, res) => {
  const { id: userId } = req.params;
  const { email, name, lastName, location, role } = req.body;
  if (!email || !name || !lastName || !location || !role) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id :${userId}`);
  }

  const updateUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updateUser });
};

export {
  register,
  login,
  updateUser,
  getAllUsers,
  deleteUser,
  updateUserAdmin,
};
