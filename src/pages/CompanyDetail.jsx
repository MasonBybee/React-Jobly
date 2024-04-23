import React from "react";
import JobCard from "../componenets/JobList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../helpers/api";

const CompanyDetail = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { handle } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await JoblyApi.getCompany(handle);
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
      <div className="CompanyDetail col-md-8 offset-md-2">
        <h4 className="CompanyDetail">{data.name}</h4>
        <p className="CompanyDetail">{data.description}</p>
        <div className="JobCardList">
          {data.jobs.map((job, idx) => (
            <JobCard key={idx} job={job} showHandle={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
