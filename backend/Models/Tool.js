const tools = [];
const db = require('../controllers/database');

class Tool{
    constructor(
        producer,
        model,
        category,
        comment,
        status,
        lastInspection,
        inspectionInterval,
        owner
    ) {
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
        return db.execute('SELECT tl.idTools, tl.Producer, tl.Model, tl.Category, tl.Comment, ' +
            'tl.InspectionInterval, Max(ins.date) as date, ins.status ' +
            'FROM tool tl ' +
            'INNER JOIN inspection ins ' +
            'ON tl.idTools = ins.idTools ' +
            'WHERE tl.owner = (?) ' +
            'group by tl.idTools', [owner]);
    }

    static fetchById(id){
        return db.execute('select * from tool where id = (?)',[id]);
    }
    static getLatest(owner){
        return db.execute('select MAX(idTools) as id from tool where Owner = (?)',[owner]);
    }

    save(){
        console.log('zapis');
        return db.execute('insert into tool (Producer, Model, Category, Comment, InspectionInterval, Owner) ' +
            'values (?, ?, ?, ?, ?, ?)',
            [this.producer, this.model, this.category, this.comment, this.inspectionInterval, this.owner]
        );
    }

}

module.exports = {
    Tool: Tool
}