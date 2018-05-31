var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  employee_id: String,
  firstname: String,
  lastname: String,
  gender: String,
  address: String,
  dateofbirth: Date,
  office: String,
  passportno: String,
  country: String,
  city: String,
  nationality: String,
  permitstatus: String,
  maritalstatus: String,
  photo: String,
  comment: String,
  dateofjoin: Date,
  fathername: String,
  mothername: String,
  status: String,
  created_at: { type: Date, default: Date.now }
  
});

module.exports = mongoose.model('Employee', EmployeeSchema);