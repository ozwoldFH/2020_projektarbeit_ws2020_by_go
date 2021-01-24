import React from "react";
import Header from "./Header";
import JSONPreview from "./JSONPreview";
import FacebookPostPreview from "./FacebookPostPreview";
import InstagramPostPreview from "./InstagramPostPreview";
import axios from "axios";
// import FacebookLogin from "react-facebook-login";
import { FacebookLogin } from "react-facebook-login-component";


class App extends React.Component {
    state = { 
        pageHeader:"My new header",
        jsonPreview: [],
        facebookPosts: [],
        instagramPosts: []
        //facebookApiKey: []
    };

    facebookSetKey = this.facebookSetKey.bind(this);
    instagramGetPosts_dev = this.instagramGetPosts_dev.bind(this);
    
    constructor(){
        super();
        //FacebookLogin.init();
    }

    //aaa = this.abc.bind(this);

    // component lifecycle
    componentDidMount() {
        // ajax, timers, listener

        // ajax test call to the api with axios
        // axios.get("/api/test")
        //     .then(response => {
        //         this.setState({
        //             jsonPreview: response.data.jsonPreview
        //         });  
        //     })
        //     .catch(console.error);


        // TODO - check if API still valid -> yes -> posts; no -> do nothing
        if (this.checkKey() == true) {
            // ajax call to the api with axios
            axios.get("/facebook/get/posts")
                .then(response => {
                    this.setState({
                        facebookPosts: response.data.message.posts.data
                    });
                })
                .catch(console.error);
        }
        
        
    }
    componentWillUnmount() {
        // clean those timers, listener
    }


    facebookSetKey(input) {
        console.log("this is my test: " + JSON.stringify(input));
        axios.post("/facebook/post/setKey", {
            data: input
        }).then(response => {
            console.log("/facebook/post/setKey response: " + response.data.status);

            axios.get("/facebook/get/posts")
                .then(response => {
                    console.log("MY POSTS: ", response.data);
                    this.setState({
                        facebookPosts: response.data.message.posts.data
                    });
                })
                .catch(console.error);


        }).catch(console.error);
    }

    instagramGetAuthentification() {
        axios.get("/instagram/get/authentificationURL")
            .then(response => {
                window.open(response.data);
            }).catch(console.error);
    }

    instagramGetPosts() {
        axios.get("/instagram/post/setKey")
            .then(response => {
                console.log(response);
                axios.get("/instagram/get/posts")
                    .then(response => {
                        console.log("MY POSTS: ", response.data);
                        this.setState({
                            instagramPosts: response.data
                        });
                    })
                    .catch(console.error);
            }).catch(console.error);
    }

    // i cannot access to much the token -> using the developer token which is valid for 30 days
    instagramGetPosts_dev() {
        axios.get("/instagram/get/postsDEV")
            .then(response => {
                console.log("MY POSTS: ", response.data.data);
                this.setState({
                    instagramPosts: response.data.data
                });
            })
            .catch(console.error);

    }

    // todo -> function to check if key is valid -> return true/false

    checkKey() {
        axios.get("/facebook/get/checkKey")
            .then(response => {
                console.log(response.data);
                return response.data.is_valid;
            })
            .catch(console.error);
        return false;
    }

    render() {
        let button;
        if (this.checkKey() == false) {
            button = <FacebookLogin
                socialId="166367041843061"
                language="en_US"
                scope="public_profile,email,user_posts,user_photos"
                responseHandler={this.facebookSetKey}
                xfbml={true}
                fields="id,email,name"
                //fields="id,name,posts{created_time,full_picture,reactions,description,message,comments,picture}"
                version="v9"
                className="facebook-login btn btn-primary"
                buttonText="Login With Facebook"/>;
        }
        else {
            <FacebookLogin
                socialId="166367041843061"
                language="en_US"
                scope="public_profile,email,user_posts,user_photos"
                //responseHandler={this.facebookSetKey}
                xfbml={true}
                fields="id,email,name"
                //fields="id,name,posts{created_time,full_picture,reactions,description,message,comments,picture}"
                version="v9"
                className="facebook-login btn btn-primary"
                buttonText="You are already logged in"/>;
        }

        let instagram_button_auth = <button type="button" className="btn btn-secondary" onClick={this.instagramGetAuthentification}>Instagram Authentification (every 1h)</button>;
        //let instagram_button_get_posts = <button type="button" className="btn btn-danger" onClick={this.instagramGetPosts}>Get Instagram Posts</button>;
        let instagram_button_get_posts = <button type="button" className="btn btn-danger" onClick={this.instagramGetPosts_dev}>Get Instagram Posts</button>;
        

        return (
            <div className="App">
                <Header message={this.state.pageHeader} />                
                {button}
                {instagram_button_auth}
                {instagram_button_get_posts}
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
                <div>
                    {(this.state.instagramPosts && this.state.instagramPosts.length > 0) && this.state.instagramPosts.map(x =>
                        <InstagramPostPreview key={x.id} {...x} />
                    )}
                </div>
                


                {/* <button type="button" className="btn btn-primary" onClick={this.instagramGetAuthentification}>CLickMe</button> */}

                {/* <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" scope="public_profile,email" onClick={this.MyFunctionTest}></div>
                     */}
                {/* <FacebookLogin
                    appId="166367041843061"
                    autoLoad={true}
                    fields="id,email,name"
                    scope="public_profile,email"
                    version="v9"
                    onClick={this.MyFunctionTest}
                    callback={this.handleResponse} /> */}

                
                {/* <FacebookLogin
                    socialId="166367041843061"
                    language="en_US"
                    scope="public_profile,email"
                    responseHandler={this.facebookSetKey}
                    xfbml={true}
                    fields="id,email,name"
                    version="v9"
                    className="facebook-login btn btn-primary"
                    buttonText="Login With Facebook"/> */}
            </div>
        );
    }
}

export default App;