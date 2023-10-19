const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usercontactSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    mobile_number: { type: String, required: true },
    student_id_img_name: String,
    profile_img_name: String
}, { timestamps: true });

const Usercontact = mongoose.model('Usercontact', usercontactSchema);

module.exports = Usercontact;