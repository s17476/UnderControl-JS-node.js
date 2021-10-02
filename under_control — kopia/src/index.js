import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './NotFound';
import Home from './Home';
import Accessibility from "./Accessibility";
import QrCodes from "./QrCodes";
import Costs from "./Costs";
import Main from "./Private/Main";
import Authorization from "./Authorization";
import AddTool from "./Private/AddTool";
import PrivateApp from "./Private/PrivateApp";
import Login from "./Forms/Login";
import LoginImgWhite from "./img/login_white.png";
import LoginImgBlack from "./img/login_black.png";
import PasswordBlack from "./img/password_black.png";
import PasswordWhite from "./img/password_white.png";
import Register from "./Forms/Register";




const routing = (
    <Router>
        <div>
            <Route path="/" component={App} />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/costs" component={Costs} />
                <Route path="/accessibility" component={Accessibility} />
                <Route path="/qrCodes" component={QrCodes} />
                <Route path="/register" component={Register} />
                <Route path="/main" component={Main} />
                <Route path="/privateapp" component={Authorization}/>
                <Route path="/addtool" component={AddTool}/>

                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)



ReactDOM.render(
  routing,
  document.getElementById('root')
);


