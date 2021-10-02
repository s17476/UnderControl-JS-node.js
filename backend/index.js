const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./Controllers/dataBase');
const tool = require('./models/tool');
const inspection = require('./models/inspection');
const Tool = tool.Tool;
const Inspection = inspection.Inspection;




const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, '/public')));
console.log(__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.get('/:id', (req, res, next) => {
    const tools = [];

    Tool.fetchAll(req.params.id)
        .then(result => {


            result[0].forEach((tool) => {
                console.log("log "+tool.status);
                tools.push({
                    id: tool.idTools,
                    producer: tool.Producer,
                    model: tool.Model,
                    category: tool.Category,
                    comment: tool.Comment,
                    status: tool.status,
                    lastInspection: tool.date,
                    inspectionInterval: tool.InspectionInterval,
                    owner: tool.Owner
                });
            })
            res.json(tools);
        } )
        .catch(result => {
            res.sendStatus(404);
        } ) ;

});

app.get('/inspections/:id', (req, res, next) => {
    const inspections = [];

    Inspection.fetchAll(req.params.id)
        .then(result => {
            result[0].forEach((ins) => {
                inspections.push({
                    id: ins.idInspection,
                    comment: ins.comment,
                    status: ins.status,
                    lastInspection: ins.date,
                });
            })
            res.json(inspections);
        } )
        .catch(result => {
            res.sendStatus(404);
        } ) ;

});

app.post('/login', (req, res, next) => {
    db.execute('select * from user where user = (?) and password = (?)',[req.body.user, req.body.password])
        .then(([result]) => {
            var user = {Id: result[0].idUser, FirstName: result[0].FirstName, LastName: result[0].LastName, User: result[0].User};

            res.json(user);
        } )
        .catch(result => {
            res.sendStatus(404);
            console.log('Login failed');
        } ) ;
});

app.post('/add', (req, res, next) => {
    let tmp = new Tool(
        req.body.producer,
        req.body.model,
        req.body.category,
        req.body.comment,
        req.body.status,
        req.body.lastInspection,
        req.body.inspectionInterval,
        req.body.owner
        );
        console.log(req.body);
    tmp.save()

        .then((result) => {
            Tool.getLatest(req.body.owner).then((idRes) => {
                let tmpIns = new Inspection(
                    req.body.lastInspection,
                    req.body.comment,
                    req.body.status,
                    idRes[0][0].id
                )
                tmpIns.save();
            })
        res.sendStatus(201);
        })
        .catch((result) => {
        res.sendStatus(409);
        });

});

app.post('/addInspection', (req, res, next) => {
    console.log(req.body);

    Tool.getLatest(req.body.owner).then((idRes) => {
        let tmpIns = new Inspection(
            req.body.lastInspection,
            req.body.comment,
            req.body.status,
            req.body.id
        )

        tmpIns.save()
            .then((result) => {

            })
        res.sendStatus(201);
    })
        .catch((result) => {
            res.sendStatus(409);
        });
});

app.delete('/deleteTool', (req, res, next) => {
    console.log(req.body);
    db.execute('delete from tool where idTools = (?)', [req.body.id])
        .then((result) => {
            res.sendStatus(204);
        }).catch((result) => {
            res.sendStatus(409);
    } )
});


app.use((req, res, next) => {
    res.status(404).send('Wrong address!');
})

app.listen(3003);