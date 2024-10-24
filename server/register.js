const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    accountType: { type: String, required: true }, // 'user', 'psychologist', 'admin'
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adminPasskey: { type: String }, // Optional field for admin users
    degreeUpload: { type: String }, // Store file path or URL
    rciNumber: { type: String }, // Optional field for RCI certificate number
    professionalOrg: { type: String } // Yes or No
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been changed
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 salt rounds
    next();
});

// Method to compare hashed password
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
