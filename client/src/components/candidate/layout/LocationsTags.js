import React from "react";

const LocationsTags = (props) => {
  const { locations, handleFilter } = props;
  return (
    <p>
      <label className="mr-2">Popular Locations:</label>
      {locations.map(({ name, value }) => {
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

export default LocationsTags;
