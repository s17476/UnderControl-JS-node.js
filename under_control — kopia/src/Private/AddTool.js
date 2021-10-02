import React, { Component } from 'react';
import './AddTool.css'
import ReactDOM from "react-dom";
import Toolbox from "./Toolbox";


class AddTool extends Component {

    mySubmitHandler = (event) => {
        event.preventDefault();
        if((this.state.producer.length < 3) || (this.state.model.length < 3))
            window.alert("Producer and model fields requires at least 3 characters!");
        else {
            let producer = document.getElementById('producerIn').value;
            let model = document.getElementById('modelIn').value;
            let comment = document.getElementById('commentIn').value;
            let lastInspection = document.getElementById('lastInspectionIn').value;
            let inspectionInterval = document.getElementById('inspectionIntervalIn').value;
            let category = document.getElementById('categoryIn').value;
            let status = document.getElementById('statusIn').value;


            const myPost = {
                producer: producer,
                model: model,
                comment: comment,
                productionYear: document.getElementById('yearIn').value,
                lastInspection: lastInspection,
                inspectionInterval: inspectionInterval,
                category: category,
                status: status,
                owner: JSON.parse(localStorage.getItem('user')).Id
            };

            fetch('http://localhost:3003/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Host': 'http://localhost:3003/add',
                    'Origin': 'http://localhost:3000/'
                },
                body: JSON.stringify(myPost)
            })
                .then((res) => {
                    if (!res.ok) {
                        window.alert("ERROR: Tool not added!");
                    } else {
                        window.alert("New tool added!");
                        ReactDOM.render(
                            <Toolbox />,
                            document.getElementById('Body'));
                    }
                })
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        return (
                <div className="Add">
                    <h1 className="Add-h1">Add new equipment</h1>
                    <form className="Add-form" onSubmit={this.mySubmitHandler}>
                        <div className="inputField">
                            <label for="producerIn" className="Add-lab">Producer:</label>
                            <input className="Add-in"
                                   id="producerIn"
                                   name="producer"
                                   type="text"
                                   minLength="3"
                                   onChange={this.myChangeHandler}
                            />
                        </div>
                        <div className="inputField">
                            <label for="modelIn" className="Add-lab">Model:</label>
                            <input className="Add-in"
                                   id="modelIn"
                                   name="model"
                                   type="text"
                                   minLength="3"
                                   onChange={this.myChangeHandler}
                            />
                        </div>
                        <div className="inputField">
                            <label htmlFor="modelIn" className="Add-lab">Production year:</label>
                            <input className="Add-in"
                                   id="yearIn"
                                   name="model"
                                   type="text"
                                   minLength="3"
                                   onChange={this.myChangeHandler}
                            />
                        </div>
                        <div className="commentField">
                            <label htmlFor="commentIn" className="Add-lab">Comment:</label>
                            <input className="Add-in"
                                   id="commentIn"
                                   name="comment"
                                   type="text"
                                   onChange={this.myChangeHandler}
                            />
                        </div>
                        <div className="lastInspectionField">
                            <label htmlFor="lastInspectionIn" className="Add-lab">Last inspection:</label>
                            <input className="Add-in"
                                   id="lastInspectionIn"
                                   name="lastInspection"
                                   type="text"
                                   onChange={this.myChangeHandler}
                            />
                        </div>
                        <div className="inspectionIntervalField">
                            <label htmlFor="inspectionIntervalIn" className="Add-lab">Inspection interval (days):</label>
                            <input className="Add-in"
                                   id="inspectionIntervalIn"
                                   name="inspectionInterval"
                                   type="text"
                                   onChange={this.myChangeHandler}
                            />
                        </div>
                        <div className="categoryField">
                            <label htmlFor="categoryIn" className="Add-lab">Category:</label>
                            <input className="Add-in"
                                   id="categoryIn"
                                   name="category"
                                   type="text"
                                   onChange={this.myChangeHandler}
                            />
                        </div>
                        <label for="statusIn" className="Add-lab">Status:</label>
                        <select className="Add-in"
                                id="statusIn"
                                name="status"
                                onChange={this.myChangeHandler}>
                            <option value="Ok">Ok</option>
                            <option value="Requires Attention">Requires Attention</option>
                            <option value="Broken">Broken</option>
                        </select>
                        <input className="Add-in-submit" id="addIn" type="submit" value="Add"/>
                    </form>
                </div>
        );
    }
}

export default AddTool;