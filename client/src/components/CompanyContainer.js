import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Companies from "./Companies.js";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import PageBtnContainer from "./PageBtnContainer";
import SearchCompany from "./SearchCompany";
const CompanyContainer = () => {
  const {
    companies,
    isLoading,
    page,
    totalCompanies,
    search,
    sort,
    numOfPages,
    getAllMyCompanies,
  } = useAppContext();
  useEffect(() => {
    getAllMyCompanies();
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
          return <Companies key={companies._id} {...companies} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default CompanyContainer;
