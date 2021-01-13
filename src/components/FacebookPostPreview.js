import React from "react";

const FacebookPostPreview = (prop) => (
    <div className="FacebookPostPreview">        
        <div className="id">
            id = {prop.id}
        </div>
        <div className="created_time">
            {prop.created_time}
        </div>
        <div className="message">
            {prop.message}
        </div>
    </div>
);

export default FacebookPostPreview;
