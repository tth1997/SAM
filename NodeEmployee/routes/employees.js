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

module.exports = router;
