const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./register'); // Import the User schema
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://chinmayj360:%23CJ%402024@mindmentorcluster.o2i19.mongodb.net/mydatabase?retryWrites=true&w=majority').then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Registration route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, accountType, degreeUpload, rciUpload, rciNumber, professionalOrg, adminPasskey } = req.body;

        // Check if admin passkey is correct
        if (accountType === 'admin' && adminPasskey !== 'CJ17') {
            return res.status(400).json({ message: 'INVALID PASSKEY' });
        }

        // Create a new user based on the account type
        const newUser = new User({
            name,
            email,
            password,
            accountType,
            degreeUpload: accountType === 'psychologist' ? degreeUpload : undefined,
            rciUpload: accountType === 'psychologist' ? rciUpload : undefined,
            rciNumber: accountType === 'psychologist' ? rciNumber : undefined,
            professionalOrg: accountType === 'psychologist' ? professionalOrg : undefined,
        });

        await newUser.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user: ' + error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
