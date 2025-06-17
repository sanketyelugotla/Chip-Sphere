const express = require('express');
const connectDB = require('./config/db')
const cors = require("cors");

const { auth, quiz, resource } = require('./routes')
const { authenticate } = require('./middleware/authenticate')

require("dotenv").config();

const app = express();

// CORS
const corsOptions = {
    origin: ['http://localhost:3000'],
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

app.use("/auth", auth);
app.use('/quiz', quiz);
app.use('/resource', resource);
// app.use(authenticate);

// Port configuration and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));