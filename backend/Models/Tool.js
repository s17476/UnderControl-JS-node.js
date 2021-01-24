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



    static fetchAll(owner){
        return db.execute('select * from tool where owner = (?)', [owner]);
    }

    static fetchById(id){
        return db.execute('select * from tool where id = (?)',[id]);
    }

    save(){
        console.log('zapis');
        return db.execute('insert into tool (idTools, Producer, Model, Category, Comment, Status, LastInspection, InspectionInterval, Owner) ' +
            'values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.id, this.producer, this.model, this.category, this.comment, this.status, this.lastInspection, this.inspectionInterval, this.owner]
        );
    }

}

module.exports = {
    Tool: Tool
}