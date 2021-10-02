import React, { Component } from 'react';
import logo from './logo.png';
import Login from "./Forms/Login";
import './App.css';
import {Link} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "Warszawa"
        };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    componentDidMount() {
        document.getElementById("go").click();
    }

    render() {
        return(
            <div className="App">
                <div className="Weather">
                    <label htmlFor="city" className="City">Type city:   </label>
                    <input className="City"
                           id="city"
                           name="city"
                           type="text"
                           placeholder="Warszawa"
                           onChange={this.myChangeHandler}
                           //onKeyDown={document.getElementById("go").click()}
                    />
                    <button className='GoButton' id="go" onClick={async () => {

                            await fetch("http://api.openweathermap.org/data/2.5/weather?q="
                                + this.state.city
                                +"&appid=911ae1dbb6a9883df17b5f7b6952e0b2&units=metric", {
                                "method": "GET"
                            })
                                .then(res => res.json())
                                .then(res => {


                                    this.setState({
                                        "temp": Math.round(res.main.temp * 10) / 10,
                                        "feels": Math.round(res.main.feels_like * 10) / 10,
                                        "icon": "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png",
                                        "country": res.sys.country
                                    });
                                })
                                .catch(err => {
                                    console.error(err);
                                })
                    }}>Go!</button>
                    <p>City: {this.state.city}, {this.state.country}</p>
                    <img className="Icon" src={this.state.icon} alt="weather_ico"/>
                    <p>Temperature: {this.state.temp} C°</p>
                    <p>Feels like: {this.state.feels} C°</p>

                </div>
                <div className="Header">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">UnderControl</h1>
                        <p className="App-title-slogan">
                            - innovation in your hands
                        </p>

                    </header>

                </div>

                <div className="App-nav" id="navbar">
                    <Link className="App-nav-item" to="/home">Home</Link>
                    <Link className="App-nav-item" to="/costs">Costs</Link>
                    <Link className="App-nav-item" to="/accessibility">Accessibility</Link>
                    <Link className="App-nav-item" to="/qrCodes">QrCodes</Link>
                    <Login />

                </div>

                <div className="xxx">

                </div>
            </div>
        );
  }
}

export default App;
