const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
    degreeUpload: { type: String },  // Path to degree file
    rciUpload: { type: String },  // Path to RCI certificate
    rciNumber: { type: String },
    professionalOrg: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
