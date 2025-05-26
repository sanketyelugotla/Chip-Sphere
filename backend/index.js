const express = require('express');
const connectDB = require('./config/db')
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS
const corsOptions = {
    origin: ['http://localhost:3000/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Connect to Database
connectDB()

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Chip sphere is running' })
})


// Port configuration and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));