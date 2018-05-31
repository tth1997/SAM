var express = require('express');
var mongoose = require('mongoose');
var employee = require("../controllers/EmployeeController.js");
var path = require('path');
var multer = require('multer');
var app = express();
var router = express.Router();
var fs = require('fs-extra')
var filessystem = require('fs');
var cache = require('memory-cache');
const opn= require('opn');

var Employee = require("../models/Employee");
var DocumentEmp = require("../models/DocumentEmp");
var DocumentType = require("../models/DocumentType");

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

function getValueByKey(key, data) {
   for (i in data) {
     if (data[i]._id == key) {
            return data[i].name;
        }
    }
}

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
  employee.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
  employee.edit(req, res);
});

// Update employee
router.post('/update/:id',upload.any(), function(req, res, next) {
  employee.update(req, res);
});

// Edit update status
router.post('/inactive/:id', function(req, res, next) {
  employee.inactive(req, res);
});

// Returns city from country-city library
router.get('/returncity', function(req, res, next) {
   var country_name = req.query.country_name;
   
   var cities = require ('countries-cities').getCities(country_name); 
   
   res.send(cities);
   
});

router.post('/adddocemp',upload.any(),function(req, res, next){
  var obj=cache.get('myjsonobj');
  console.log("start");
  console.log(req.body.id1);
  console.log(req.files);
  
  if(req.files.length>0){
    
     
     
    var dir = './public/uploads/employeerecords/'+ req.body.id1 ;
      
      if (!fs.existsSync(dir))
     filessystem.mkdirSync(dir);
      
     
     var dir1 = './public/uploads/employeerecords/'+ req.body.id1 + '/Passport';
     
     if (!fs.existsSync(dir1))
     filessystem.mkdirSync(dir1);
   
     var dir2 = './public/uploads/employeerecords/'+ req.body.id1 + '/CDC';
     if (!fs.existsSync(dir2))
     filessystem.mkdirSync(dir2);
   
     var dir3 = './public/uploads/employeerecords/'+ req.body.id1 + '/CV';
     if (!fs.existsSync(dir3))
     filessystem.mkdirSync(dir3);
   
     var dir4 = './public/uploads/employeerecords/'+ req.body.id1 + '/Appraisal';
     if (!fs.existsSync(dir4))
     filessystem.mkdirSync(dir4);
   
     var dir5 = './public/uploads/employeerecords/'+ req.body.id1 + '/Interview Form';
     if (!fs.existsSync(dir5))
     filessystem.mkdirSync(dir5);
   
     var dir6 = './public/uploads/employeerecords/'+ req.body.id1 + '/Certificates';
     if (!fs.existsSync(dir6))
     filessystem.mkdirSync(dir6);
   
     var dir7 = './public/uploads/employeerecords/'+ req.body.id1 + '/IC';
     if (!fs.existsSync(dir7))
     filessystem.mkdirSync(dir7);
   
      
   
     var documenttype = getValueByKey(req.body.documenttype,obj.documenttype);
     
     console.log(documenttype);
       
     if(documenttype == "Attachment Of IC"){
         
          for(var i = 0; i < req.files.length ;i++){
          console.log("inside");
          console.log(req.files.length);
          
          fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir7 + '/' + req.files[i].filename , function (err) {
               if (err) return console.error(err)
               console.log("success!")
              });
          
            var docemp = {employee_id: req.body.id1, documenttype_id: req.body.documenttype,
                                  documentype: documenttype ,filename: req.files[i].filename,       
                  filepath: '/uploads/employeerecords/'+ req.body.id1 + '/IC' + '/' + req.files[i].filename,
                  status:'Active' ,typeofdoc: 'IC'};
                  
                  mongoose.connection.db.collection("documentemp").insert(docemp, function(err, result){
                    if(err){
                    console.log("err",err);
                    }
                 
                });
        }
     }
     
       if(documenttype == "Attachment Of Passport"){
         
          for(var i = 0; i < req.files.length ;i++){
          console.log("inside");
          console.log(req.files.length);
          
          fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir1 + '/' + req.files[i].filename , function (err) {
               if (err) return console.error(err)
               console.log("success!")
              });
          
            var docemp = {employee_id: req.body.id1, documenttype_id: req.body.documenttype,
                                  documentype: documenttype ,filename: req.files[i].filename,       
                  filepath: '/uploads/employeerecords/'+ req.body.id1 + '/Passport' + '/' + req.files[i].filename,
                  status:'Active' ,typeofdoc: 'Passport'};
                  
                  mongoose.connection.db.collection("documentemp").insert(docemp, function(err, result){
                    if(err){
                    console.log("err",err);
                    }
                 
                });
        }
     }
     if(documenttype == "Attachment Of CDC"){
         
          for(var i = 0; i < req.files.length ;i++){
          console.log("inside");
          console.log(req.files.length);
          
          fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir2 + '/' + req.files[i].filename , function (err) {
               if (err) return console.error(err)
               console.log("success!")
              });
          
            var docemp = {employee_id: req.body.id1, documenttype_id: req.body.documenttype,
                                  documentype: documenttype ,filename: req.files[i].filename,       
                  filepath: '/uploads/employeerecords/'+ req.body.id1 + '/CDC' + '/' + req.files[i].filename,
                  status:'Active' ,typeofdoc: 'CDC'};
                  
                  mongoose.connection.db.collection("documentemp").insert(docemp, function(err, result){
                    if(err){
                    console.log("err",err);
                    }
                  
                });
        }
     }
     if(documenttype == "Attachment Of CV"){
         
          for(var i = 0; i < req.files.length ;i++){
          console.log("inside");
          console.log(req.files.length);
          
          fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir3 + '/' + req.files[i].filename , function (err) {
               if (err) return console.error(err)
               console.log("success!")
              });
          
            var docemp = {employee_id: req.body.id1, documenttype_id: req.body.documenttype,
                                  documentype: documenttype ,filename: req.files[i].filename,       
                  filepath: '/uploads/employeerecords/'+ req.body.id1 + '/CV' + '/' + req.files[i].filename,
                  status:'Active' ,typeofdoc: 'CV'};
                  
                  mongoose.connection.db.collection("documentemp").insert(docemp, function(err, result){
                    if(err){
                    console.log("err",err);
                    }
                  
                });
        }
     }
     if(documenttype == "Attachment Of Appraisal"){
         
          for(var i = 0; i < req.files.length ;i++){
          console.log("inside");
          console.log(req.files.length);
          
          fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir4 + '/' + req.files[i].filename , function (err) {
               if (err) return console.error(err)
               console.log("success!")
              });
          
            var docemp = {employee_id: req.body.id1, documenttype_id: req.body.documenttype,
                                  documentype: documenttype ,filename: req.files[i].filename,       
                  filepath: '/uploads/employeerecords/'+ req.body.id1 + '/Appraisal' + '/' + req.files[i].filename,
                  status:'Active' ,typeofdoc: 'Appraisal'};
                  
                  mongoose.connection.db.collection("documentemp").insert(docemp, function(err, result){
                    if(err){
                    console.log("err",err);
                    }
                  
                });
        }
     }
     if(documenttype == "Interview Form"){
         
          for(var i = 0; i < req.files.length ;i++){
          
          
          fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir5 + '/' + req.files[i].filename , function (err) {
               if (err) return console.error(err)
               console.log("success!")
              });
          
            var docemp = {employee_id: req.body.id1, documenttype_id: req.body.documenttype,
                                  documentype: documenttype ,filename: req.files[i].filename,       
                  filepath: '/uploads/employeerecords/'+ req.body.id1 + '/Interview Form' + '/' + req.files[i].filename,
                  status:'Active' ,typeofdoc: 'Interview Form'};
                  
                  mongoose.connection.db.collection("documentemp").insert(docemp, function(err, result){
                    if(err){
                    console.log("err",err);
                    }
                  
                });
        }
     }
     if(documenttype == "Certificates"){
         
          for(var i = 0; i < req.files.length ;i++){
          
          
          fs.move('./public/uploads/employeerecords/' + req.files[i].filename , dir6 + '/' + req.files[i].filename , function (err) {
               if (err) return console.error(err)
               console.log("success!")
              });
          
            var docemp = {employee_id: req.body.id1, documenttype_id: req.body.documenttype,
                                  documentype: documenttype ,filename: req.files[i].filename,       
                  filepath: '/uploads/employeerecords/'+ req.body.id1 + '/Certificates' + '/' + req.files[i].filename,
                  status:'Active' ,typeofdoc: 'Certificates'};
                  
                  mongoose.connection.db.collection("documentemp").insert(docemp, function(err, result){
                    if(err){
                    console.log("err",err);
                    }
                  
                });
        }
     }
      
     DocumentEmp.find({status:'Active',employee_id:req.body.id1}).exec(function (err, docemp) {
                  if (err) {
                   console.log("Error:", err);  
                  }
             console.log("Add",docemp);
             res.send(docemp);
           });
  }
  
       
      
});

// 
router.get('/returndocemp', function(req, res, next) {
   var employee_id = req.query.employee_id;
   
   DocumentEmp.find({status:'Active',employee_id:req.query.employee_id}).exec(function (err, docemp) {
                  if (err) {
                   console.log("Error:", err);  
                  }
   
   console.log("loading",docemp);
   res.send(docemp);
   }); 
});

router.get('/inactivedoc/:id', function(req, res, next) {
  
  
  console.log("start");
  console.log(req.params.id);
  
  
   DocumentEmp.findById({_id:req.params.id}).exec(function (err, docemp) {
                  if (err) {
                   console.log("Error:", err);  
                  }
   docemp.status='Inactive';
   console.log(docemp);
   docemp.save(function(err, data) {
        if (err) {
          console.log("Error:", err);
        }
   
        else {
          console.log("Document Inactive/Active!");
      console.log(req.body.id1);
      
          DocumentEmp.find({status:'Active',employee_id:docemp.employee_id}).exec(function (err, docemp) {
                  if (err) {
                   console.log("Error:", err);
                  }
                  else {
               res.send(docemp);
                }
                });
    }
  });
 });
});

module.exports = router;
