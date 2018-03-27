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
	// console.log("Router save", req.headers, req.body)
	employee.save(req, res);
});

module.exports = router;
