import React from 'react';
import Tool from '../Models/Tool'
import './Toolbox.css';
import Inspection from "../Models/Inspection";

class History extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }



//get items list from local rest api.
    componentDidMount() {



        var items = [];
        fetch("http://localhost:3003/inspections/" + JSON.parse(localStorage.getItem('toolId')))
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach(item => {
                        items.push(new Inspection(
                            item.id,
                            item.comment,
                            item.status,
                            item.lastInspection,
                            localStorage.getItem('toolId')
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

    render() {
        return (
            <div>
                <h1 id="MyToolbox">My toolbox</h1>
                <table className="ItemsTable">
                    <thead>
                    <tr>
                        <th id="th-id">ID</th>
                        <th>Comment</th>
                        <th>Last inspection</th>
                        <th>Tool ID</th>
                        <th id="th-status">Status</th>
                    </tr>
                    </thead>

                    {this.state.items.map(item => (
                        <tbody>
                        <tr key={item.id} id={item.id} className="tabRow" >
                            <td className="id">{item.id}</td>
                            <td className="producer">{item.comment}</td>
                            <td className="model">{new Date(item.lastInspection).toLocaleDateString()}</td>
                            <td className="category">{item.toolId}</td>
                            <td className="status">{item.status}</td>





                        </tr>

                        <tr className="details" id={"-" + item.id}>
                            <td className="hiddenRow" colSpan="5">
                                <div className="hiddenDiv">
                                    <div className="lastInspection">
                                        <p className="tabLabel">Last inspection:</p>
                                        {new Date(item.lastInspection).toLocaleDateString()}
                                    </div>
                                    <div className="inspectionInterval">
                                        <p className="tabLabel">Inspection interval:</p>
                                        {item.inspectionInterval}
                                    </div>
                                    <div className="comment">
                                        <p className="tabLabel">Comment:</p>
                                        {item.comment}
                                    </div>
                                    <div className="actions">
                                        <p className="tabLabel">Actions:</p>
                                        <button
                                            id="deleteButton"
                                            title="Delete from list"
                                            onClick={async () => {
                                                let list = this.state.items;
                                                let index = item.id;
                                                //deletes chosen item from list - after confirmation
                                                let txt = "Are you sure you want to permanently remove this item?"
                                                if(window.confirm(txt)){
                                                    const delItem = {
                                                        id: index
                                                    };
                                                    await fetch('http://localhost:3003/deleteTool', {
                                                        method: 'DELETE',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Host': 'http://localhost:3003/add',
                                                            'Origin': 'http://localhost:3000/'
                                                        },
                                                        body: JSON.stringify(delItem)
                                                    })
                                                        .then(async (res) => {
                                                            if (res.ok) {

                                                                list.splice(list.indexOf(item, 0), 1);
                                                                document.getElementById('-'+index).style.display = 'none';
                                                                await this.setState({items:list});

                                                            } else {
                                                                window.alert(
                                                                    "ERROR: Something went wrong! \n\n" +
                                                                    "Item not deleted!");
                                                            }
                                                        })




                                                }
                                            }}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            </td>

                        </tr>

                        </tbody>
                    ))}

                </table>

            </div>)
    }
}

export default History;