var express = require('express');
var router = express.Router();
var job = require("../controllers/JobController.js");

// Get all jobs
router.get('/', function(req, res) {
  job.list(req, res);
});

// Get single job by id
router.get('/show/:id', function(req, res) {
  job.show(req, res);
});

// Create job
router.get('/create', function(req, res) {
  job.create(req, res);
});

// Save job
router.post('/save', function(req, res) {
  job.save(req, res);
});

// Edit job
router.get('/edit/:id', function(req, res) {
  job.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  job.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  job.delete(req, res);
});

module.exports = router;
