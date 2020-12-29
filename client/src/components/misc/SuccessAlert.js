import React from "react";

const SuccessAlert = (props) => {
  return (
    <div className="alert alert-success" role="alert">
      {props.message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={props.clearSuccess}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default SuccessAlert;
