var express = require('express');
var mongoose = require('mongoose');
var employee = require("../controllers/EmployeeController.js");
var path = require('path');
var multer = require('multer');
var app = express();
var router = express.Router();
var fs = require('fs-extra')
var filessystem = require('fs');
const opn= require('opn');

var Employee = require("../models/Employee");

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
router.post('/save',upload.any(), function(req, res, next) {
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
 console.log('print martial status',req.body.maritalstatus);
 console.log("after var employee", req.headers,req.body);
 
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
});

// Edit employee
router.get('/edit/:id', function(req, res) {
  employee.edit(req, res);
});

// Update employee
router.post('/update/:id',upload.any(), function(req, res, next) {

  console.log('Update body',req.params.id);
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
});

// Edit update status
router.post('/inactive/:id', function(req, res, next) {
  employee.inactive(req, res);
});

module.exports = router;
