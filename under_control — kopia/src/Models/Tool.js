import React from 'react';

//data model class
class Tool extends React.Component{
    constructor(
        id,
        producer,
        model,
        category,
        comment,
        status,
        lastinspection,
        inspectionInterval,
        owner
    ) {
        super();
        this.id = id;
        this.producer =  producer;
        this.model = model;
        this.category = category;
        this.comment = comment;
        this.status = status;
        this.lastInspection = lastinspection;
        this.inspectionInterval = inspectionInterval;
        this.owner = owner;
    }

    render(){
        return (
            <div className="item">
                {this.producer}
            </div>
        );
    }
}

export default Tool;