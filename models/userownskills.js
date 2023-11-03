const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userownskillsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Userdetails', required: true, unique: true },
    //ownSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    ownSkills: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      unique: true,
     }],
  }, { timestamps: true });
  

const Userownskills = mongoose.model('Userownskills', userownskillsSchema);

module.exports = Userownskills;