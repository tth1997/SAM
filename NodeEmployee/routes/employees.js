var express = require('express');
var mongoose = require('mongoose');
var employee = require("../controllers/EmployeeController.js");
var path = require('path');
var app = express();
var router = express.Router();

var Employee = require("../models/Employee");

// Get all employees
router.get('/', function(req, res) {
  employee.list(req, res);
});

// Get individual employees
router.get('/show/:id', function(req, res) {
  employee.show(req, res);
});

// Create employees
router.get('/create', function(req, res) {
  employee.create(req, res);
});

// Save employees
router.post('/save', function(req, res, next) {
   var employee = new Employee({

   	firstname: req.body.firstname,
   	lastname:req.body.lastname,
   	address:req.body.address,
   	dateofbirth:req.body.dateofbirth,
   	office:req.body.office,
   	passportno:req.body.passportno,
   	country:req.body.country,
   	city:req.body.city,
   	nationality:req.body.nationality,
   	permitstatus:req.body.permitstatus,
   	maritalstatus:req.body.maritalstatus,
   	comment:req.body.comment,
   	dateofjoin:req.body.dateofjoin,
	// photo: req.file.filename,
	fathername:req.body.fathername,
	mothername:req.body.mothername
});
 console.log("after var employee", req.headers,req.body)
	 if(employee.dateofbirth != null)
	 {
	   employee.dateofbirth = employee.dateofbirth.toLocaleDateString("en-US");
	 }
	 if(employee.dateofjoining != null)
	 {
	   employee.dateofjoin = employee.dateofjoin.toLocaleDateString("en-US");
	 }
	 
	 var employee_id;
       
	   mongoose.connection.db.collection("counters").findAndModify( { _id: 'employeeid' }, null, { $inc: { sequence_value: 1 } }, function(err, result){
        if(err) console.log("Error:",err);
	         employee_id = result.value.sequence_value;
			
			 var joindate = new Date(req.body.dateofjoin);
             var yyyy = joindate.getFullYear();
             var year = yyyy.toString().substr(-2);
 
       employee.employee_id = 'SL' + year + '00' + employee_id ;

   employee.save(function(err){
   	if(err) {
   		console.log(err);
   		res.render("../views/employees/create");
   	} else {
   		 console.log("Successfully created an employee.");
   		Employee.find({}).exec(function (err, employees) {
   			if (err) {
   				console.log("Error:", err);
   			}
   			else {
   				res.render("../views/employees/index", {employees: employees});
   			}
   		});
   	}

   });
});
	});

// Edit employee
router.get('/edit/:id', function(req, res) {
  employee.edit(req, res);
});

module.exports = router;
