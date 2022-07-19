import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const JobsNoFunctions = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { setEditJob, deleteJob, setJobId } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do,YYYY");
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <Wrapper>
      <header>
        <div className="main-icon" style={{ backgroundColor: randomColor }}>
          {company.charAt(0)}
        </div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to={`/apply-job/${_id}`}
              className="btn btn-primary"
              onClick={() => setJobId(_id)}
            >
              Apply for job
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default JobsNoFunctions;
