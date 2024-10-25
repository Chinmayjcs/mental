const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('./register'); // Import User model

const app = express();
const upload = multer({ dest: 'uploads/' }); // Folder to store uploaded files

// Middleware to handle JSON requests
app.use(express.json());

// MongoDB Atlas connection
const uri = "mongodb+srv://chinmayj360:%23CJ%402024@mindmentorcluster.o2i19.mongodb.net/mydatabase?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas connection string
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Register route with multer handling file uploads
app.post('/register', upload.fields([{ name: 'degree-upload' }, { name: 'rci-upload' }]), async (req, res) => {
    try {
        const { name, email, password, accountType, rciNumber, professionalOrg } = req.body;
        const degreeUpload = req.files['degree-upload'] ? req.files['degree-upload'][0].path : null;
        const rciUpload = req.files['rci-upload'] ? req.files['rci-upload'][0].path : null;

        // Create a new user using the User schema
        const newUser = new User({
            name,
            email,
            password,
            accountType,
            degreeUpload,
            rciUpload,
            rciNumber,
            professionalOrg,
        });

        await newUser.save(); // Save the new user to the database
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Error registering user: ' + error.message });
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3000');
});
