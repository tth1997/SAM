var mongoose = require('mongoose');


var JobAssignmentSchema = new mongoose.Schema({
  job_Assignid:{
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          required: true,
          auto: true,
        },
  employeename: String,
  jobtype: String,
  vessel: String,
  company: String,
  assigneddate: String,
  traveldate: String,
  destfrom: String,
  destto: String
  
});


module.exports = mongoose.model('JobAssgnment', JobAssignmentSchema);
