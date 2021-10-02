import React from 'react';

//data model class
class Inspection extends React.Component{
    constructor(
        id,
        comment,
        status,
        lastinspection,
        toolId
    ) {
        super();
        this.id = id;
        this.comment = comment;
        this.status = status;
        this.lastInspection = lastinspection;
        this.toolId = toolId;
    }

    render(){
        return (
            <div className="item">
                {this.id}
            </div>
        );
    }
}

export default Inspection;