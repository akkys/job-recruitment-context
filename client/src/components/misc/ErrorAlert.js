import React from "react";

const ErrorAlert = (props) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {props.message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={props.clearError}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
