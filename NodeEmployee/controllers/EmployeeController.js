var mongoose = require("mongoose");
var Employee = require("../models/Employee");
var Country=require("../models/Country");
var Jobs = require("../models/Job");
var multer = require('multer');
var fs = require('fs-extra')
var filessystem = require('fs');
var employeeController = {};

// file upload destination folder
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/employeerecords');
  },
  // file upload extension
  filename: function(req, file, cb) {
    cb(null, (file.originalname).replace(/ /g,"_"));
  }
});
// file upload variable
var upload = multer({
  storage: storage
});

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

// Save employees
employeeController.save = function(req,res) {
 var employee = new Employee({

  firstname: req.body.firstname,
  lastname:req.body.lastname,
  gender:req.body.gender,
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
  fathername:req.body.fathername,
  mothername:req.body.mothername
});
 
 if(employee.dateofbirth != null)
 {
  employee.dateofbirth = employee.dateofbirth.toLocaleDateString("en-GB");
}
if(employee.dateofjoining != null)
{
  employee.dateofjoin = employee.dateofjoin.toLocaleDateString("en-GB");
}

//auto generate new employee id and default status "Active"
var employee_id;

mongoose.connection.db.collection("counters").findAndModify( { _id: 'employeeid' }, null, { $inc: { sequence_value: 1 } }, function(err, result){
  if(err) console.log("Error:",err);
  employee_id = result.value.sequence_value;

  employee.employee_id = 'SL' + '00' + employee_id ;
  employee.status = "Active";

//create folders for individual profiles in public/uploads/employeerecords
  var dir = './public/uploads/employeerecords/'+ employee.employee_id ;

  filessystem.mkdirSync(dir);


  var dir2 = './public/uploads/employeerecords/'+ employee.employee_id + '/profile';

  filessystem.mkdirSync(dir2);


  var dir3 = '/uploads/employeerecords/'+ employee.employee_id + '/profile';

//move photo from storage to designated profile folder
    if(req.files.length > 0)
               {
              for(var i = 0; i < req.files.length ;i++)
           {
             
            fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir2 + '/' + req.files[i].filename , function (err) {
                       if (err) return console.error(err)
                       console.log("success!")
                      });
          employee.photo = dir3 + '/' + req.files[i].filename;
          }
         }

  employee.save(function(err){
    if(err) {
     console.log(err);
     res.render("../views/employees/create");
   } else {
    console.log("Successfully created an employee.");
     console.log("after var employee", req.body);
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

// Update employee
employeeController.update = function(req, res) {

  console.log('Update body',req.body);
  Employee.findById(req.params.id, function(err, data) {  

    data.firstname = req.body.firstname;
    data.lastname = req.body.lastname;
    data.gender = req.body.gender;
    data.address = req.body.address;
    data.office = req.body.office;
    data.dateofbirth = req.body.dateofbirth;
    data.passportno = req.body.passportno;
    data.country = req.body.country;
    data.city = req.body.city;
    data.nationality = req.body.nationality;
    data.permitstatus = req.body.permitstatus;
    data.maritalstatus = req.body.maritalstatus;
    data.comment = req.body.comment;
    data.dateofjoin = req.body.dateofjoin;
    data.fathername = req.body.fathername;
    data.mothername = req.body.mothername;

//find folders belonging to the employee id
      var dir2 = './public/uploads/employeerecords/'+ data.employee_id + '/profile';
      
      var dir3 = '/uploads/employeerecords/'+ data.employee_id + '/profile';
    
     
    
    if(req.files.length > 0)
               {
              for(var i = 0; i < req.files.length ;i++)
           {
             
            fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir2 + '/' + req.files[i].filename , function (err) {
                       if (err) return console.error(err)
                       console.log("success!")
                      });
          data.photo = dir3 + '/' + req.files[i].filename;
          }
         }

    data.save(function(err, data) {
      if (err) {
        return next(err);
      }
      Employee.find({}).exec(function (err, employees) {
        if (err) {
         console.log("Error:", err);
       }
       else {
         res.redirect("/employees");
       }
     });
    });
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
          console.log("Employee Inactive/Active!");
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