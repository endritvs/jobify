import mongoose from "mongoose";
import validator from "validator";
const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    companyAddress: {
      type: String,
      required: [true, "Please provide company address"],
      maxlength: 50,
    },
    companyEmail: {
      type: String,
      required: [true, "Please provide company email"],
      //   validate: {
      //     validator: validator.isEmail,
      //     message: "Please provide valid email!",
      //   },
    },
    companyPhone: {
      type: String,
      required: [true, "Please provide company phone"],
      maxlength: 50,
    },
    companyDescription: {
      type: String,
      required: [true, "Please provide company description"],
      maxlength: 250,
    },
    workingHourStart: {
      type: String,
      required: [true, "Please provide the hours start!"],
      default: "08:00 AM",
    },
    workingHourEnd: {
      type: String,
      required: [true, "Please provide the hours end!"],
      default: "16:00 PM",
    },
    companyLocation: {
      type: String,
      required: [true, "Please provide company location"],
      maxlength: 250,
      default: "my city",
    },
    companyCategory: {
      type: String,
      required: [true, "Please provide company category!"],
      default: "Business",
    },
    createdByUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
