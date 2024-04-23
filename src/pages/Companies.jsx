import React, { useState, useEffect } from "react";
import "../static/Companies.css";
import JoblyApi from "../../helpers/api";
import CompanyListCard from "../componenets/CompanyListCard";
import { useUser } from "../features/User";
import SearchBar from "../componenets/SearchBar";

const Companies = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await JoblyApi.getCompanies();
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="pt-5">
      <div className="CompanyList col-md-8 offset-md-2">
        <SearchBar setData={setData} search={"companies"} />
        <div className="CompanyList-list">
          {data.map((company, index) => (
            <CompanyListCard key={index} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
