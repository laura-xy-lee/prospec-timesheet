const express = require('express')
const app = express()
var path = require('path');
const port = 3000

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Public/index.html'));
});

app.use(express.static(__dirname + '/Public/css'));
app.use(express.static(__dirname + '/Public/js'));

app.listen(process.env.PORT || port, 
	() => console.log(`Timesheet app listening on port ${port} ...`));

// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
//   });
// });
