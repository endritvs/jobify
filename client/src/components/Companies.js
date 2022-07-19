import moment from "moment";
import { FaLocationArrow } from "react-icons/fa";
import {
  MdAlternateEmail,
  MdCall,
  MdLockOutline,
  MdLockOpen,
  MdLocationOn,
  MdOutlineDescription,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Companies = ({
  _id,
  companyName,
  companyAddress,
  companyEmail,
  companyPhone,
  companyDescription,
  workingHourStart,
  workingHourEnd,
  companyLocation,
  companyCategory,
}) => {
  const { setEditCompany, deleteCompany } = useAppContext();
  //   let date = moment(createdAt);
  //   date = date.format("MMM Do,YYYY");
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <Wrapper>
      <header>
        <div className="main-icon" style={{ backgroundColor: randomColor }}>
          {companyName.charAt(0)}
        </div>
        <div className="info">
          <h5>{companyName}</h5>
          <p>Business Category: {companyCategory}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<MdLocationOn />} text={companyLocation} />
          <JobInfo icon={<FaLocationArrow />} text={companyAddress} />
          <JobInfo icon={<MdAlternateEmail />} text={companyEmail} />
          <JobInfo icon={<MdCall />} text={companyPhone} />
          <JobInfo icon={<MdLockOpen />} text={workingHourStart} />
          <JobInfo icon={<MdLockOutline />} text={workingHourEnd} />

          <JobInfo icon={<MdOutlineDescription />} text={companyDescription} />
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/company"
              className="btn edit-btn"
              onClick={() => setEditCompany(_id)}
            >
              Edit
            </Link>

            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteCompany(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Companies;
