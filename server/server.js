const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./register'); // Adjust the path based on your project structure

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://chinmayj360:%23CJ%402024@mindmentorcluster.o2i19.mongodb.net/mydatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Registration Route
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user: ' + error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
