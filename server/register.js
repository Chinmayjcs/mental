const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: { type: String, enum: ['user', 'psychologist', 'admin'], required: true },
    degreeUpload: { type: String }, // For psychologists only
    rciUpload: { type: String },    // Optional for psychologists
    rciNumber: { type: String },    // Optional for psychologists
    professionalOrg: { type: String }, // Required for psychologists
    adminPasskey: { type: String }, // Only for admin, validated during registration
});

const User = mongoose.model('User', userSchema);

module.exports = User;
