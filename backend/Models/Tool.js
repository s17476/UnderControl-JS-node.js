const tools = [];
const db = require('../controllers/database');

class Tool{
    constructor(
        id,
        producer,
        model,
        category,
        comment,
        status,
        lastInspection,
        inspectionInterval,
        owner
    ) {
        this.id = id;
        this.producer =  producer;
        this.model = model;
        this.category = category;
        this.comment = comment;
        this.status = status;
        this.lastInspection = lastInspection;
        this.inspectionInterval = inspectionInterval;
        this.owner = owner;
    }



    static fetchAll(){
        return db.execute('select * from tool');
    }

    static fetchById(id){
        return db.execute('select * from tool where id = (?)',[id]);
    }
}

module.exports = {
    Tool: Tool
}