import React from "react";

function FacebookPostReactions (reaction) {
    return (
        <div className="FacebookPostReactions">        
            <div className="like">
                {reaction.type} by {reaction.name}
            </div>
        </div>
    );
}

function FacebookPostPreview (prop) {
    let comments;
    let reactions;
    let full_picture;

    if("reactions" in prop) {
        reactions = <div>
            {prop.reactions.data.map(x =>
                <FacebookPostReactions key={x.id} {...x} />
            )}
            
        </div>;
    } else {
        reactions = <div></div>;
    }

    if("comments" in prop) {
        comments = <div>
            {prop.comments.data.map(x =>
                <FacebookPostPreview key={x.id} {...x} />
            )}
        </div>;
    } else {
        comments = <div></div>;
    }

    if("full_picture" in prop){
        full_picture = <img src={prop.full_picture} />
    } 
    // else {
    //     full_picture = <div></div>;
    // }


    return (
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
            <div className="full_picture">
                {full_picture}
            </div>
            <div>
                {comments}
                {reactions}
            </div>
        </div>
    );
}

    
export default FacebookPostPreview;
