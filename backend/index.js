const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./Controllers/dataBase');
const tool = require('./models/tool');
const Tool = tool.Tool;




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

app.get('/', (req, res, next) => {
    const equipmentArray = [];
    Tool.fetchAll()
        .then(result => {
            result[0].forEach((eq) => {
                equipmentArray.push({
                    id: eq.idTools,
                    producer: eq.Producer,
                    model: eq.Model,
                    category: eq.Category,
                    comment: eq.Comment,
                    status: eq.Status,
                    lastInspection: eq.LastInspection,
                    inspectionInterval: eq.InspectionInterval,
                    owner: eq.Owner
                });
            })
            res.json(equipmentArray);
        } )
        .catch(result => {
        } ) ;
});

app.post('/login', (req, res, next) => {
    db.execute('select * from user where user = (?) and password = (?)',[req.body.user, req.body.password])
        .then(([result]) => {
            var user = {Id: result[0].idUser, FirstName: result[0].FirstName, LastName: result[0].LastName, User: result[0].User};

            console.log('Login OK ' + user.User);
            res.json(user);
        } )
        .catch(result => {
            res.sendStatus(404);
            console.log('Login failed');
        } ) ;
});


app.use((req, res, next) => {
    res.status(404).send('Wrong address!');
})

app.listen(3003);