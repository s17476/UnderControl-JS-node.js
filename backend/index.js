const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const equipment = require('./models/equipment');


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
    Equipment.fetchAll()
        .then(result => {

            result[0].forEach((eq) => {
                equipmentArray.push({id: eq.id, producer: eq.producer, model: eq.model, status: eq.status});
            })
            res.json(equipmentArray);
        } )
        .catch(result => {
        } ) ;
});


app.use((req, res, next) => {
    res.status(404).send('Nie znaleziono strony');
})

app.listen(3003);