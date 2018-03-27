var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

router.get('/employee', function(req, res, next) {
  res.render('employee', { title: 'Express' });
});

router.get('/job', function(req, res, next) {
  res.render('job', { title: 'Express' });
});

module.exports = router;
