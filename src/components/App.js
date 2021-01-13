import React from "react";
import Header from "./Header";
import JSONPreview from "./JSONPreview";
import FacebookPostPreview from "./FacebookPostPreview";
import axios from "axios";


class App extends React.Component {
    state = { 
        pageHeader:"My new header",
        jsonPreview: [],
        facebookPosts: []
    };

    // component lifecycle
    componentDidMount() {
        // ajax, timers, listener

        // ajax test call to the api with axios
        axios.get("/api/test")
            .then(response => {
                this.setState({
                    jsonPreview: response.data.jsonPreview
                });
            })
            .catch(console.error);

        // ajax call to the api with axios
        axios.get("/facebook/get/posts")
            .then(response => {
                this.setState({
                    facebookPosts: response.data.message.posts.data
                });
            })
            .catch(console.error);
        
    }
    componentWillUnmount() {
        // clean those timers, listener
    }


    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                <div>
                    {this.state.jsonPreview.map(x =>
                        <JSONPreview key={x.id} {...x} />
                    )}
                </div>
                <div>
                    {this.state.facebookPosts.map(x =>
                        <FacebookPostPreview key={x.id} {...x} />
                    )}
                </div>
            </div>
        );
    }
}

export default App;