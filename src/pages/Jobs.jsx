import React, { useState, useEffect } from "react";
import "../static/Jobs.css";
import JobCard from "../componenets/JobList";
import JoblyApi from "../../helpers/api";
import SearchBar from "../componenets/SearchBar";

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await JoblyApi.getJobs();
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
      <div className="JobList col-md-8 offset-md-2">
        <SearchBar setData={setData} search={"jobs"} />
        <div className="JobCardList">
          {data.map((job, idx) => (
            <JobCard key={idx} job={job} showHandle={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
