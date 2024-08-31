const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travelBookingDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// MongoDB Driver Schema
const driverSchema = new mongoose.Schema({
    name: String,
    location: String,
    rating: Number,
    availableDate: String
});

const Driver = mongoose.model('Driver', driverSchema);

// API route to fetch drivers based on location and date
app.post('/api/drivers', (req, res) => {
    const { location, date } = req.body;
    Driver.find({ location, availableDate: date }, (err, drivers) => {
        if (err) return res.status(500).send(err);
        res.json(drivers);
    });
});

// Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
