const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userownskillsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Userdetails', required: true},
    //ownSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    ownSkills: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill'
     }],
  }, { timestamps: true });
  

const Userownskills = mongoose.model('Userownskills', userownskillsSchema);

module.exports = Userownskills;