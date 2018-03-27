var express = require('express');
var router = express.Router();
var jobassignment = require("../controllers/JobAssignmentController.js");
var path = require('path');
var multer  =   require('multer');
var JobAssignment = require("../models/JobAssignment");
var cache = require('memory-cache');


// file upload destination folder
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  // file upload extension
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// file upload variable
var upload = multer({
  storage: storage
});


// Get all employees
router.get('/', function(req, res) {
  jobassignment.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
  jobassignment.show(req, res);
});

// Create employee
router.get('/create', function(req, res) {
  jobassignment.create(req, res);
    
});

// Save employee
router.post('/save', function(req, res) {
	
	 
	 
	 var obj=cache.get('myjsonobj');
	 console.log(obj.employee);
	
	var jobassignment = new JobAssignment({
		
		    employee_id:req.body.employee_id,
            employeename: req.body.employeename,
			job_id:req.body.job_id,
			jobtype:req.body.jobtype,
			vessel:req.body.vessel,
            company:req.body.company,
            assigneddate:req.body.assigneddate,
            traveldate:req.body.traveldate,
            destfrom:req.body.destfrom,
            destto:req.body.destto,
			doc: req.file.filename,
            
       });
	
	 jobassignment.save(function(err) {
              if(err) {
                console.log(err);
                res.render("../views/jobassignments/create");
                } else {
                console.log("Successfully created an jobAssignment.");
                JobAssignment.find({}).exec(function (err, jobassignments) {
                  if (err) {
                   console.log("Error:", err);
                  }
                  else {
		           res.render("../views/jobassignments/index", {jobassignments: jobassignments});
	              }
                });
				}
            });
	
	 
});
	
	
// Edit employee
router.get('/edit/:id', function(req, res) {
  jobassignment.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  jobassignment.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  jobassignment.delete(req, res);
});

module.exports = router;
