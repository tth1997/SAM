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

// Show employee by id
employeeController.show = function(req, res) {
  Employee.findOne({employee_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
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
  Employee.findOne({employee_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/edit", {employee: employee});
    }
  });
};

module.exports = employeeController;