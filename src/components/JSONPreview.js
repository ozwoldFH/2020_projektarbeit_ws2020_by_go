import React from "react";

const JSONPreview = (jsonProp) => (
    <div className="JSONPreview">
        <div className="title">
            {jsonProp.title}
        </div>
        <div className="description">
            {jsonProp.description}
        </div>
    </div>
);

export default JSONPreview;