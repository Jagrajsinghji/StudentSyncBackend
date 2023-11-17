const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userwantskillsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Userdetails', required: true},
    wantSkills: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill'
     }],
  }, { timestamps: true });
  

const Userwantskills = mongoose.model('Userwantskills', userwantskillsSchema);

module.exports = Userwantskills;