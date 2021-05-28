const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");

app.use(bodyParser.json());

// //테이블 생성
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields)=> {
//     console.log('results :', results);
// });

//db DATA GET
app.get("/api/values", function(req, res){

    db.pool.query('SELECT * FROM lists;', (err, results, fields)=>{
        if(err){
            return res.status(500).send(err);
        } else {
            return res.json(results);
        }
    })

});

//DATABASE CREATE
app.post("/api/value", function(req, res){
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, feilds)=>{
        if(err){
            return res.status(500).send(err);
        } else {
            return res.json({ success: true, value: req.body.value });
        }
    })
});




app.listen(5000, ()=> console.log(`✅ SERVER IS RUNNING AT : 5000`));