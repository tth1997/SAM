var mongoose = require("mongoose");
var Employee = require("../models/Employee");
var Country=require("../models/Country");
// var multer  =   require('multer');

var Jobs = require("../models/Job");
var Counters = require("../models/Counter");
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
	Employee.find({_id: req.params.id}).exec(function (err, employees) {
		if (err) {
			console.log("Error:", err);
		}
		else {
			res.render("../views/employees/index", { employees: employees });
		}
	});
};

//Create Employee
employeeController.create = function(req,res){
	res.render("../views/employees/create");
}

// Save employee
// router.post('/save',upload.single('photo'),function(req, res,next) {
	employeeController.save = function(req, res) {

		 // console.log(req.body);

   var employee = new Employee({

   	firstname: req.body.firstname || "Thadoe",
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

//    function employeeAutoInc(sequenceN){

//    var sequenceDocument = db.counters.findAndModify({
//       query:{_id: sequenceN},
//       update: {$inc:{sequence_value:1}},
//       new:true
//    });
//    var year = new Date();
//    var current = year.getFullYear();
//    var formattedSeq = ("00" + sequenceDocument.sequence_value).slice(-2);
//    var form = "SL" + formattedSeq+ current;
//    return form;

// }
// console.log("after var employee", req.headers,req.body)
// console.log(employee);

   employee.save(function(err){
   	if(err) {
   		console.log(err);
   		res.render("../views/employees/create");
   	} else {
   		// console.log("Successfully created an employee.");
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
}

module.exports = employeeController;