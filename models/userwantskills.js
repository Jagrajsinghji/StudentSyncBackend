const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userwantskillsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Userdetails', required: true, unique: true },
    wantSkills: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      unique: true,
     }],
  }, { timestamps: true });
  

const Userwantskills = mongoose.model('Userwantskills', userwantskillsSchema);

module.exports = Userwantskills;