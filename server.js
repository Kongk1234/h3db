const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
dotenv.config();

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

conn.connect(function(err) {
    if (err) throw err; 
    console.log("Connected!");
});

app.use('/', express.static('./public', {extensions: false}));

app.post('/getSpecTask', (req, res) => {
    conn.query("SELECT project.task, task.taskName FROM project LEFT JOIN person ON project.person = person.id LEFT JOIN task ON project.task = task.id WHERE person.id = (select id from person where person.name = ?)", req.body.name, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.post('/getUserTask', (req, res) => {
    conn.query("SELECT project.task, task.taskName, project.person, person.name FROM project LEFT JOIN person ON project.person = person.id LEFT JOIN task ON project.task = task.id WHERE task.id = (select id from task where taskName = ?)",req.body.taskName, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/allTask', (req, res) => {
    conn.query("SELECT * FROM task", function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/allUsers', (req, res) => {
    conn.query("SELECT name FROM person", function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.post('/createTask', (req, res) => {
    conn.query("insert ignore into task(taskName, timeStart, timeEnd) values(?, ?, ?)",[req.body.taskName, req.body.timeStart, req.body.timeEnd], function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.post('/createUser', (req, res) => {
    conn.query("insert ignore into person(name) values(?)",req.body.name, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});


app.post('/addToTask', (req, res) => {
    conn.query("insert ignore into project (person, task) values ((select id from person where name = ?),(select id from task where taskName = ? ));",[req.body.name, req.body.taskName], function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});


app.put('/updateUser', (req, res) => {
    conn.query("update person set name = ? where name = ?;", [req.body.newName, req.body.oldName], function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.put('/updateTask', (req, res) => {
    conn.query("update task set taskName = ?, timeStart = ?, timeEnd = ? where taskName = ?", [req.body.newName, req.body.timeStart, req.body.timeEnd, req.body.oldName], function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});


app.delete('/deleteUser', (req, res) => {
    conn.query("delete from person where name = ?", req.body.name, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.delete('/removeFromTask', (req, res) => {
    conn.query("delete from project where person = (select id from person where person.name = ?) and task = (select id from task where task.taskName = ?)", [req.body.name, req.body.taskName], function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

app.delete('/deleteTask', (req, res) => {
    conn.query("delete from task where taskName = ?",req.body.taskName, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});


app.listen('3000', () => {console.log('server is listening at port 3000');})