var mongoose = require("mongoose");
var Employee = require("../models/Employee");
var Country=require("../models/Country");

var Jobs = require("../models/Job");
var employeeController = {};


// file upload destination folder
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'public/uploads/');
//   },
//   // file upload extension
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// file upload variable
// var upload = multer({
//   storage: storage
// });
// Show list of employees

employeeController.list = function(req, res) {
	Employee.find({}).exec(function (err, employees) {
		if (err) {
			console.log("Error:", err);
		}
		else {


			res.render("../views/employees/index", {employees: employees});
		}
	});
};

//Show employee by id
employeeController.show = function(req,res){
	Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
		
		console.log("show",req.params.id);
		if (err) {
			console.log("Error:", err);
		}
		else {
			console.log("show 12",employee);

			res.render("../views/employees/show", {employee: employee});
		}
	});
};

//Create Employee
employeeController.create = function(req,res){
	res.render("../views/employees/create");
}

// Save employee

// Edit an employee
employeeController.edit = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
  	console.log("Edit id", req.params.id);
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/edit", {employee: employee});
    }
  });
};

// inactive an employee
employeeController.inactive = function(req, res) {
   Employee.findById(req.params.id, function(err, data) {	
	 var newvalues;
	 var valStatus = data.status;
	 var newStatus;
	 
	 if(valStatus == "Inactive"){
		 
	      newStatus = 'Active';
	      newvalues = {$set: {status: "Active"} };
	 }
	 if(valStatus == "Active"){
		  
		  newStatus = 'Inactive';
	      newvalues = {$set: {status: "Inactive"} };
	 }
	 data.status=newStatus;	  
	
	 data.save(function(err, data) {
        if (err) {
          console.log("Error:", err);
        }
	 
        else {
          console.log("Client Inactive/Active!");
          Employee.find({}).exec(function (err, employees) {
                  if (err) {
                   console.log("Error:", err);
                  }
                  else {
		           res.redirect("/employees");
	              }
                });
    }
  });
});
};

module.exports = employeeController;