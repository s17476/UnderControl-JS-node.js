import React, { Component } from 'react';
import ReactDOM from "react-dom";
import NotFound from "./NotFound";
import PrivateApp from "./Private/PrivateApp";


class Authorization extends Component {

    render() {
        if(localStorage.getItem('Authorized') === 'true')
            return(<PrivateApp />);
        else
            return(<NotFound />);
    }
}

export default Authorization;