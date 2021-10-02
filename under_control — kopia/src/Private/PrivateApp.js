import React, { Component } from 'react';
import './PrivateApp.css';
import HomeGreen from "../img/homeGreen.png";
import HomeWhite from "../img/homeWhite.png";
import ToolboxGreen from "../img/toolBoxGreen.png"
import ToolboxWhite from "../img/toolBoxWhite.png"
import AddWhite from "../img/plusWhite.png"
import AddGreen from "../img/plusGreen.png"
import InspectionWhite from "../img/inspectionWhite.png"
import InspectionGreen from "../img/inspectionGreen.png"
import ReactDOM from "react-dom";
import Main from "./Main";
import Toolbox from "./Toolbox";
import AddTool from "./AddTool";
import AddInspection from "./AddInspection";


class PrivateApp extends Component {

    renderToBody = (element) => {
        ReactDOM.render(
            element,
            document.getElementById('Body')
        );
    }

    componentDidMount() {

        var menu = document.getElementById("menu");
        var sticky = menu.offsetTop - 40;

        window.onscroll = () => {
            if (window.pageYOffset >= sticky) {
                menu.classList.add("stickySideMenu");
            } else {
                menu.classList.remove("stickySideMenu");
            }



        }

        ReactDOM.render(
            <Main />,
            document.getElementById('Body'));
    }

    render() {
        return (
            <div className="PrivateApp">
                <div className="Menu" id="menu">
                    <ul>
                        <li>
                            <div className="Menu-item" onClick={() => {
                                ReactDOM.render(
                                    <Main />,
                                    document.getElementById('Body'));
                            }}>
                                 <img className="Menu-icon"  id="HomeWhite" src={HomeWhite} alt="" />
                                <img className="Menu-icon-green" id="HomeGreen" src={HomeGreen} alt="" />
                                <p className="Menu-text">Dashboard</p>

                            </div>
                            <div className="Menu-hover-bar"/>
                        </li>
                        <li>
                            <div className="Menu-item" onClick={() => {
                                ReactDOM.render(
                                    <Toolbox />,
                                    document.getElementById('Body'));
                            }}>
                                <img className="Menu-icon"  id="ToolboxWhite" src={ToolboxWhite} alt="" />
                                <img className="Menu-icon-green" id="ToolboxGreen" src={ToolboxGreen} alt="" />
                                <p className="Menu-text">Toolbox</p>

                            </div>
                            <div className="Menu-hover-bar"/>
                        </li>
                        <li>
                            <div className="Menu-item" onClick={() => {
                                ReactDOM.render(
                                    <AddTool />,
                                    document.getElementById('Body'));
                            }}>
                                <img className="Menu-icon"  id="ToolboxWhite" src={AddWhite} alt="" />
                                <img className="Menu-icon-green" id="ToolboxGreen" src={AddGreen} alt="" />
                                <p className="Menu-text">Add new tool</p>

                            </div>
                            <div className="Menu-hover-bar"/>
                        </li>
                        <li>
                            <div className="Menu-item" onClick={() => {
                                ReactDOM.render(
                                    <AddInspection />,
                                    document.getElementById('Body'));
                            }}>
                                <img className="Menu-icon"  id="InspectionWhite" src={InspectionWhite} alt="" />
                                <img className="Menu-icon-green" id="InspectionGreen" src={InspectionGreen} alt="" />
                                <p className="Menu-text">New inspection</p>

                            </div>
                            <div className="Menu-hover-bar"/>
                        </li>

                    </ul>
                </div>
                <div id="Body">
                    body
                </div>
            </div>

        );
    }
}

export default PrivateApp;