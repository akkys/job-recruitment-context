import React from "react";

const ExperiencesTags = (props) => {
  const { experiences, handleFilter } = props;
  return (
    <p>
      <label className="mr-2">Experiences:</label>

      {experiences.map(({ name, value }) => {
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

export default ExperiencesTags;
