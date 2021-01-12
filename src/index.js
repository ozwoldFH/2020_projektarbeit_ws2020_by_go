import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const App = (props) => {
    return (
        <h2 className="text-center">
            {props.headerMessage}
        </h2>
    );
};

// validation
App.propTypes = {
    headerMessage: PropTypes.string
};

// default values
App.defaultProps = {
    headerMessage: "default header value"
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);