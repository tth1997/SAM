var mongoose = require('mongoose');
var Counters = require("../models/Counter");

var EmployeeSchema = new mongoose.Schema({
  employee_id:{
    type: String,
    index: true,
    // required: true,
    // auto: true,
  },
  firstname: String,
  lastname: String,
  address: String,
  dateofbirth: Date,
  office: String,
  passportno: String,
  country: String,
  city: String,
  nationality: String,
  permitstatus: String,
  martialstatus: String,
  // photo: String,
  comment: String,
  dateofjoin: Date,
  fathername: String,
  mothername: String,
  updated_at: { type: Date, default: Date.now }
  
});
EmployeeSchema.pre('save', function(next) {
  console.log("pre save", this)
  var doc = this;
  Counters.findByIdAndUpdate({_id: 'employeeid'}, {$inc: { sequence_value: 1} }, function(error, counter)   {
    if(error){
      return next(error);
    }
    var year = new Date();
    var current = year.getFullYear();
    var formattedSeq = ("00" + counter.sequence_value).slice(-2);
    doc.employee_id = "SL"+ formattedSeq + current;
    console.log(doc);
    next();
  });
});

module.exports = mongoose.model('Employee', EmployeeSchema);