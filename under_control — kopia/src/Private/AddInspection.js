import React, { Component } from 'react';
import './AddTool.css'
import ReactDOM from "react-dom";
import Toolbox from "./Toolbox";
import Tool from "../Models/Tool";


class AddInspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        var items = [];
        fetch("http://localhost:3003/" + JSON.parse(localStorage.getItem('user')).Id)
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach(item => {
                        items.push(new Tool(
                            item.id,
                            item.producer,
                            item.model,
                            item.category,
                            item.comment,
                            item.status,
                            item.lastInspection,
                            item.inspectionInterval,
                            item.owner
                        ));
                    })
                    this.setState({
                        isLoaded: true,
                        items: items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    mySubmitHandler = (event) => {
        event.preventDefault();
        if(!this.state.lastInspection){
            window.alert("Date field can't be empty!");
            return null;
        }
        if(this.state.lastInspection.length < 3)
            window.alert("Date field can't be empty!");
        else {
            let id = document.getElementById('toolIn').value;
            let lastInspection = document.getElementById('lastInspectionIn').value;
            let comment = document.getElementById('commentIn').value;
            let status = document.getElementById('statusIn').value;


            const myPost = {
                id: id,
                comment: comment,
                lastInspection: lastInspection,
                status: status,
                owner: JSON.parse(localStorage.getItem('user')).Id
            };

            fetch('http://localhost:3003/addInspection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Host': 'http://localhost:3003/addInspection',
                    'Origin': 'http://localhost:3000/'
                },
                body: JSON.stringify(myPost)
            })
                .then((res) => {
                    if (!res.ok) {
                        window.alert("ERROR: Inspection not added!");
                    } else {
                        window.alert("New inspection added!");
                        ReactDOM.render(
                            <Toolbox/>,
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
                <h1 className="Add-h1">Add new inspection</h1>
                <form className="Add-form" onSubmit={this.mySubmitHandler}>
                    <label htmlFor="toolIn" className="Add-lab">Choose tool:</label>
                    <select className="Add-in"
                            id="toolIn"
                            name="tool"
                            onChange={this.myChangeHandler}>
                        {this.state.items.map(item => (
                            <option value={item.id}>{item.id} {item.producer} {item.model}</option>
                        ))}
                    </select>
                    <div className="lastInspectionField">
                        <label htmlFor="lastInspectionIn" className="Add-lab">Date of inspection (date format yyyy-MM-dd):</label>
                        <input className="Add-in"
                               id="lastInspectionIn"
                               name="lastInspection"
                               type="text"
                               minLength="8"
                               pattern="20[0-9][0-9]-[0-9][0-9]-[0-3][0-9]"
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
                    <label htmlFor="statusIn" className="Add-lab">Status:</label>
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

export default AddInspection;