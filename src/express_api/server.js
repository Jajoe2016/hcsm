const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db_query = require('./db_query');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const req_body = req.body;
    response = { "code": 200, "req-body": req_body, "message": "API-POST-OK" }
    res.end(JSON.stringify(response));
});
app.post('/login', function (req, res) { db_query.validateUserByUsername(req, res) })
app.post('/createuser', function (req, res) { db_query.createUser(req, res) })
app.post('/createpatient', function (req, res) { db_query.createPatient(req, res) })
app.post('/getuser', function (req, res) { db_query.getUser(req, res) })
app.get('/getusers', function (req, res) { db_query.getUsers(req, res) })
app.get('/getpatients', function (req, res) { db_query.getPatients(req, res) })
app.post('/createappt', function (req, res) { db_query.createAppt(req, res) } )
app.post('/updateappt', function (req, res) { db_query.updateAppt(req, res) } )
app.get('/gettodayappts', function (req, res) { db_query.getTodaysAppts(req, res) } )
app.get('/getallappts', function (req, res) { db_query.getAllAppts(req, res) } )
app.post('/updateuser', function (req, res) {db_query.updateUser(req, res)})

app.get('/file', function (req, res) {
    res.sendFile(__dirname + "/" + "file.html");
})
app.get('/', function (req, res) {
    response = { "code": 200, "message": "API-GET-OK" }
    res.end(JSON.stringify(response));
})

app.listen(port, () => console.log(`API listening on port ${port}!`));