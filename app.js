const express = require('express')
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser')

require('dotenv').config();

const port = 3002
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
	          table +='<tr><td>'
			        + res[i]._date 
			        +'</td><td>'
			        + res[i].employee_id 
			        +'</td><td>'
			        + (res[i].time_in_0 == null ? '-' : res[i].time_in_0)
			        +'</td><td>'
			        + (res[i].time_out_0 == null ? '-' : res[i].time_out_0) 
			        +'</td><td>'
			        + (res[i].time_in_1 == null ? '-' : res[i].time_in_1) 
			        +'</td><td>'
			        + (res[i].time_out_1 == null ? '-' : res[i].time_out_1) 
			        +'</td><td>'
			        + parseFloat(Math.round(res[i].hours_worked * 100) / 100).toFixed(2)
			        +'</td><td>'
			        + parseFloat(Math.round(res[i].regular_hours * 100) / 100).toFixed(2)
			        +'</td><td>'
			        + parseFloat(Math.round(res[i].overtime_hours * 100) / 100).toFixed(2)
			        +'</td></tr>';
	      }
	      table ='<table border="1"><tr><th>Date</th><th>Employee id</th><th>Time in (AM)</th><th>Time out (Lunch)</th><th>Time in (Lunch)</th><th>Time out (PM)</th><th>Hours worked</th><th>Regular hours</th><th>Overtime hours</th></tr>'+ table +'</table>';

	      con.release(); //Done with mysql connection

	      return cback(table);
	    });
	  });
};

app.post('/view', function(req, res) {
	var startDate = req.body.startDate
	var endDate = req.body.endDate
	var query = "SELECT * from timesheet.timesheet where _date >= '"+startDate+"' and _date <= '"+endDate+ "';"
	getTimesheetView(sql=query,
	resql=>{
	    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
	    res.write(resql, 'utf-8');
	    res.end();
	})
});

app.listen(process.env.PORT || port, 
	() => console.log(`Timesheet app listening on port ${port} ...`));
