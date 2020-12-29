import React from "react";

const JobtypeTags = (props) => {
  const { jobTypes, handleFilter } = props;
  return (
    <p>
      <label className="mr-2">JobTypes:</label>

      {jobTypes.map(({ name, value }) => {
        return (
          <small key={name}>
            <button
              key={name}
              name={name}
              value={value}
              onClick={handleFilter}
              className="tags"
            >
              {name}
            </button>
          </small>
        );
      })}
    </p>
  );
};

export default JobtypeTags;
