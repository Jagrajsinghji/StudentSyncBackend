const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userdetailsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_status: { type: String, enum: ["active", "pending", "inactive"], required: true },
    institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    mobile_number: { type: String, required: true },
    student_id_img_name: String,
    profile_img_name: String
  }, { timestamps: true });
  

// Hash password before saving
userdetailsSchema.pre('save', async function(next) {
  const userdetails = this;
  if (userdetails.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    userdetails.password = await bcrypt.hash(userdetails.password, salt);
  }
  next();
});

const Userdetails = mongoose.model('Userdetails', userdetailsSchema);

module.exports = Userdetails;