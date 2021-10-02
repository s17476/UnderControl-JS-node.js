import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import LoginImgWhite from "../img/login_white.png";
import LoginImgBlack from "../img/login_black.png";
import LoginImgRed from "../img/login_red.png";
import PasswordWhite from "../img/password_white.png";
import PasswordBlack from "../img/password_black.png";
import './Login.css';
import {Link} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: false,
            logout: false,
            username: '',
            password: '',
        };
    }


    mySubmitHandler = async (event) => {
        event.preventDefault();
        if(this.state.user.length < 5)
            window.alert("User field requires at least 5 characters!");
        else if(this.state.password.length < 8)
            window.alert("Password field requires at least 8 characters!");
        else {
            let user = document.getElementById('user').value;
            let password = document.getElementById('password').value;

            const myPost = {
                login: true,
                user: user,
                password: password
            };

            await fetch('http://localhost:3003/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Host': 'http://localhost:3003/login',
                    'Origin': 'http://localhost:3000/'
                },
                body: JSON.stringify(myPost)
            })
                .then(res => res.json())
                .then((jsonData) => {
                    localStorage.setItem('user', JSON.stringify(jsonData));//dane////////////////////////////

                })
                .catch((err) => {
                    window.alert("ERROR: Wrong user or password!");
                    localStorage.removeItem('user');
                });
            if(localStorage.getItem('user') != null){
                localStorage.setItem('Authorized', true);
                this.setState({'login': true});

            }

        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }



    render() {
        const login = this.state.login;
        const logout = this.state.logout;
        if(logout){
            this.setState({'logout': false});

            return(
                <Redirect to="/home"/>
            );
        }
        if(login){
            return(
                <div className="Logged">
                    <div className="Logged-icon">
                        <img className="App-nav-loginImg" id="LoggedImgWhite" src={LoginImgWhite} title="Log in" alt="" />
                        <img
                            className="App-nav-loginImg"
                            id="LoggedImgRed" src={LoginImgRed}
                            title="Log out"
                            alt="" onClick={() => {
                            localStorage.setItem('Authorized', 'false');
                            localStorage.removeItem('user');
                            this.setState({'login': false, 'logout': true});

                        }}/>
                    </div>
                        <Link className="LoginBtn" id="RegBtn" to="/privateapp">Dashboard</Link>
                        <p className="Welcome"> Witaj {JSON.parse(localStorage.getItem('user')).FirstName}</p>
                        <Redirect to="/privateapp"/>

                </div>

                );
        }

        if(localStorage.getItem('Authorized') === 'true')
            this.setState({'login': true});

        return (
            <div className="App-login" id="Login">
                <img className="App-nav-loginImg" id="LogInImgWhite" src={LoginImgWhite} alt="" />
                <img className="App-nav-loginImg" id="LogInImgBlack" src={LoginImgBlack} alt="" onClick={() => {
                    var e = document.getElementById("LoginForm");
                    if(e.style.display === 'block')
                        e.style.display = 'none';
                    else
                        e.style.display = 'block';
                }}/>

                <div className="App-nav-login" id="LoginForm">
                    <form className="Login-form" id="LoginF">
                        <input className="Login-input"
                               id="user"
                               name="user"
                               type="text"
                               minLength="5"
                                onChange={this.myChangeHandler}/>
                        <div className="App-nav-login" id="PswdDiv">
                            <img className="App-nav-loginImg" id="PasswordWhite" src={PasswordWhite} alt=""/>
                            <img className="App-nav-loginImg" id="PasswordBlack" src={PasswordBlack} alt=""/>
                        </div>

                        <input className="Login-input"
                               id="password"
                               name="password"
                               type="password"
                               minLength="8"
                                onChange={this.myChangeHandler}/>
                        <Link className="LoginBtn" id="RegBtn" to="/register">Register</Link>
                        <Link className="LoginBtn" id="LoginBtn" onClick={this.mySubmitHandler}>Log in</Link>
                    </form>

                </div>



            </div>
        );
    }
}

export default Login;
