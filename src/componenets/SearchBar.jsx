import React, { useState } from "react";
import JoblyApi from "../../helpers/api";
const initialState = "";

const SearchBar = ({ setData, search }) => {
  const [value, setValue] = useState(initialState);

  const inputHandler = (e) => setValue(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    let resp;
    if (search === "companies") {
      resp = await JoblyApi.getCompanies(value ? { name: value } : "");
    } else if (search === "jobs") {
      resp = await JoblyApi.getJobs(value ? { title: value } : "");
    }
    setData(resp);
  };
  return (
    <div className="SearchForm mb-4">
      <form onSubmit={submitHandler}>
        <div className="row justify-content-center justify-content-lg-start gx-0">
          <div className="col-8">
            <input
              className="form-control form-control-lg"
              name="searchTerm"
              placeholder="Enter search term.."
              value={value}
              onChange={inputHandler}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-lg btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
