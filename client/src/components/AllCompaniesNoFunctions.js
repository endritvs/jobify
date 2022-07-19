import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
// import CompaniesNoFunctions from "./CompaniesNoFunctions.js";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import PageBtnContainer from "./PageBtnContainer";
import CompaniesFind from "./CompaniesFind";
const AllCompanies = () => {
  const {
    companies,
    isLoading,
    page,
    totalCompanies,
    search,
    sort,
    numOfPages,
    getAllCompanies,
  } = useAppContext();
  useEffect(() => {
    getAllCompanies();
  }, [page, search, sort]);
  if (isLoading) {
    return <Loading center />;
  }
  if (companies.length === 0) {
    return (
      <Wrapper>
        <h2>No companies to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalCompanies} compan
        {companies.length === 1 ? "y found" : "ies founds"}
      </h5>
      <div className="jobs">
        {companies.map((companies) => {
          return <CompaniesFind key={companies._id} {...companies} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default AllCompanies;
