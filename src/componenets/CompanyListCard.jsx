import React from "react";

const CompanyListCard = ({ company }) => {
  return (
    <a className="Companies-card card" href={`companies/${company.handle}`}>
      <div className="card-body">
        <h6 className="card-title">{company.handle}</h6>
        <p>
          <small>{company.description}</small>
        </p>
      </div>
    </a>
  );
};

export default CompanyListCard;
