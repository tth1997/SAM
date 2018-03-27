var mongoose = require("mongoose");
var JobAssignment = require("../models/JobAssignment");
var Job = require("../models/Job");
var Vessel = require("../models/Vessel");
var Employee = require("../models/Employee");
var Company=require("../models/Company");
var Country=require("../models/Country");

var cache = require('memory-cache');


var obj = {};



var jobAssignmentController = {};




// Show list of jobAssignments
jobAssignmentController.list = function(req, res) {
  JobAssignment.find({}).exec(function (err, jobassignments) {
    if (err) {
      console.log("Error:", err);
    }
    else {
	  res.render("../views/jobassignments/index", {jobassignments: jobassignments});
    }
  });
};

// Show jobAssignments by id
jobAssignmentController.show = function(req, res) {
  JobAssignment.findOne({_id: req.params.id}).exec(function (err, jobassignment) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/jobassignments/show", {jobassignment: jobassignment});
    }
  });
};

// Create new jobAssignments
jobAssignmentController.create = function(req, res) {


	Employee.find({}).exec(function(err,employee){
		   if(err){
			   console.log("Error:",err);
		   }
		   
	Job.find({}).exec(function(err,job){
	        if(err){
				console.log("Error:",err);
			}
			
    Vessel.find({}).exec(function(err,vessel){
	        if(err){
				console.log("Error:",err);
			}
				
    Company.find({}).exec(function(err,company){
	        if(err){
				console.log("Error:",err);
			}
				
    Country.find({}).exec(function(err,country){
	        if(err){
				console.log("Error:",err);
			}
							
			
			obj['employee'] = employee;
            obj['job'] = job;
            obj['vessel'] = vessel;
            obj['company'] = company;
			obj['country'] = country;
            
			cache.put('myjsonobj', obj);
            
			
    		res.render("../views/jobassignments/create",{employee:employee,job:job,vessel:vessel,company:company,country:country});
			
	});
	});
	});
	});	
	});
	//to store data or json object into cache
    
	
};

// Save new jobAssignments

   

// Edit an jobAssignments
jobAssignmentController.edit = function(req, res) {
  JobAssignment.findOne({_id: req.params.id}).exec(function (err, jobassignment) {
    if (err) {
      console.log("Error:", err);
    }
    else {
		console.log(jobassignment);
      res.render("../views/jobassignments/edit", {jobassignment: jobassignment});
    }
  });
};

// Update a job
jobAssignmentController.update = function(req, res) {
  JobAssignment.findByIdAndUpdate(req.params.id, { $set: { employeename: req.body.employeename, 
                                                      jobtype: req.body.jobtype,vessel: req.body.vessel,
													  company: req.body.company,assigneddate: req.body.assigneddate,
													  traveldate:req.body.traveldate,
													  destfrom: req.body.destfrom,destto: req.body.destto}}, { new: true }, function (err, job) {
    if (err) {
      console.log(err);
      res.render("../views/jobassignments/edit", {jobassignment: req.body});
    }
    JobAssignment.find({}).exec(function (err, jobassignments) {
                  if (err) {
                   console.log("Error:", err);
                  }
                  else {
		           res.render("../views/jobassignments/index", {jobassignments: jobassignments});
	              }
                });
  });
};

// Delete a job
jobAssignmentController.delete = function(req, res) {
  JobAssignment.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("JobAssignment deleted!");
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
};

module.exports = jobAssignmentController;
