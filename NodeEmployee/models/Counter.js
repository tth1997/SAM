var mongoose = require('mongoose');


var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    sequence_value: { type: Number, default: 1 },
  updated_at: { type: Date, default: Date.now }
  
});

module.exports = mongoose.model('Counter', CounterSchema);