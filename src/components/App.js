import React from "react";
import Header from "./Header";
import ContestPreview from "./ContestPreview";
import axios from "axios";


class App extends React.Component {
    state = { 
        pageHeader:"My new header",
        contests: []
    };

    // component lifecycle
    componentDidMount() {
        // ajax, timers, listener

        // ajax call to the api with axios
        axios.get("/api/contests")
            .then(response => {
                this.setState({
                    contests: response.data.contests
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
                    {this.state.contests.map(contest =>
                        <ContestPreview key={contest.id} {...contest} />
                    )}
                </div>
            </div>
        );
    }
}

export default App;