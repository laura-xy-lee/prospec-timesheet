const express = require('express')
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser')

require('dotenv').config();

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Settings to connect to database
const pool = mysql.createPool({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
});

// Gets everything needed for web interface
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Public/index.html'));
});

app.use(express.static(__dirname + '/Public/css'));
app.use(express.static(__dirname + '/Public/js'));

// Goes to DB to get timesheet table
var getTimesheetView = function(sql, cback){
	pool.getConnection((err, con)=>{
    	if(err) throw err;

	    con.query(sql, (err, res, cols)=>{
	      if(err) throw err;

	      var table =''; //to store html table

	      //create html table with data from res.
	      for(var i=0; i<res.length; i++){
	          table +='<tr><td>'+ res[i].tap_id +'</td><td>'+ res[i].employee_id +'</td><td>'+ res[i].tap_time +'</td></tr>';
	      }
	      table ='<table border="1"><tr><th>Tap id</th><th>Employee id</th><th>Tap time</th></tr>'+ table +'</table>';

	      con.release(); //Done with mysql connection

	      return cback(table);
	    });
	  });
};

app.post('/view', function(req, res) {
	getTimesheetView(sql="SELECT * from timesheet.tap_time",
	resql=>{
	    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
	    res.write(resql, 'utf-8');
	    res.end();
	})
});

app.listen(process.env.PORT || port, 
	() => console.log(`Timesheet app listening on port ${port} ...`));
