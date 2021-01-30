const inspections = [];
const db = require('../controllers/database');

class Inspection{
    constructor(
        lastInspection,
        comment,
        status,
        toolId
    ) {
        this.lastInspection = lastInspection;
        this.comment = comment;
        this.status = status;
        this.toolId = toolId;
    }

    static fetchAll(toolId){
        return db.execute('select * from inspection where idTools = (?) order by date desc', [toolId]);
    }

    static fetchById(id){
        return db.execute('select * from inspection where idInspection = (?) order by date asc',[id]);
    }

    static fetchByToolId(id){
        console.log("toolid "+id);
        return db.execute('select * from inspection where idTools = (?) order by date desc limit 1',[id]);
    }

    save(){
        console.log('zapis');
        return db.execute('insert into inspection (date, comment, status, idTools) ' +
            'values (?, ?, ?, ?)',
            [this.lastInspection, this.comment, this.status, this.toolId]
        );
    }

}

module.exports = {
    Inspection: Inspection
}