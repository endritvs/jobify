import { UnAuthenticatedError } from "../errors/index.js";

const checkPermisions = (requestUser, resourceUserId) => {
  if (
    requestUser.role === "admin" ||
    requestUser.userId === resourceUserId.toString()
  ) {
    return;
  } else {
    throw new UnAuthenticatedError("Not authorized to access this route!");
  }
};

export default checkPermisions;
