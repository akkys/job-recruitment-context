import React from "react";

const SearchInput = (props) => {
  const { search, setSearch } = props;
  return (
    <>
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-search fa-lg" />
        </span>
      </div>

      <input
        type="text"
        className="form-control"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Company or Position or Job Type or Location..."
      />
    </>
  );
};

export default SearchInput;
