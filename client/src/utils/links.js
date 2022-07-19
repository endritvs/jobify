import { IoBarChartSharp } from "react-icons/io5";
import { MdOutlineFindInPage } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaRegBuilding } from "react-icons/fa";
import { CgWorkAlt } from "react-icons/cg";
import { RiDashboardLine } from "react-icons/ri";

const links = [
  // { id: 9, text: "dashboard", path: "dashboard", icon: <RiDashboardLine /> },
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  // { id: 2, text: "my jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 3, text: "add job", path: "add-job", icon: <FaWpforms /> },
  {
    id: 7,
    text: "find job",
    path: "find-job",
    icon: <CgWorkAlt />,
  },

  { id: 5, text: "add company", path: "company", icon: <FaRegBuilding /> },

  {
    id: 8,
    text: "find company",
    path: "find-company",
    icon: <MdOutlineFindInPage />,
  },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];

export default links;
