import { useUser } from "../features/User";
import JoblyApi from "../../helpers/api";
import { useState } from "react";

const JobCard = ({ job, showHandle }) => {
  const { user } = useUser();
  const [applied, setApplied] = useState(user.applications.includes(job.id));
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = JoblyApi.applyForJob(user.username, job.id);
    setApplied(true);
  };
  return (
    <div className="Job-card card">
      <div className="card-body">
        <h6 className="card-title">{job.title}</h6>
        {showHandle ? <p>{job.companyHandle}</p> : ""}
        <div>
          <small>Salary: {Number(job.salary).toLocaleString()}</small>
        </div>
        <div>
          <small>Equity: {job.equity || 0}</small>
        </div>
        {applied ? (
          <button
            className="btn btn-danger fw-bold text-uppercase float-end"
            disabled={true}
          >
            Applied
          </button>
        ) : (
          <button
            onClick={submitHandler}
            className="btn btn-danger fw-bold text-uppercase float-end"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
