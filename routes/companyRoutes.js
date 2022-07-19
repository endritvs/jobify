import express from "express";
const router = express.Router();
import {
  createCompany,
  getAllMyCompanies,
  getAllCompanies,
  deleteCompany,
  updateCompany,
} from "../controllers/companyController.js";

router.route("/").post(createCompany).get(getAllMyCompanies);
router.route("/find-company").get(getAllCompanies);

router.route("/:id").delete(deleteCompany).patch(updateCompany);

export default router;
