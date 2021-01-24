import React from "react";


function InstagramPostReview (prop) {
    // let comments;
    // let reactions;
    let media_url;

    // if("reactions" in prop) {
    //     reactions = <div>
    //         {prop.reactions.data.map(x =>
    //             <FacebookPostReactions key={x.id} {...x} />
    //         )}
            
    //     </div>;
    // } else {
    //     reactions = <div></div>;
    // }

    // if("comments" in prop) {
    //     comments = <div>
    //         {prop.comments.data.map(x =>
    //             <FacebookPostPreview key={x.id} {...x} />
    //         )}
    //     </div>;
    // } else {
    //     comments = <div></div>;
    // }

    if("media_url" in prop){
        media_url = <img src={prop.media_url} />;
    } 
    // else {
    //     media_url = <div></div>;
    // }


    return (
        <div className="InstagramPostPreview">        
            <div className="id">
                    id = {prop.id}
            </div>
            <div className="timestamp">
                {prop.timestamp} by {prop.username}
            </div>
            <div className="media_type">
                {prop.media_type}
            </div>
            <div>
                {media_url}
            </div>
        </div>
    );
}

    
export default InstagramPostReview;
