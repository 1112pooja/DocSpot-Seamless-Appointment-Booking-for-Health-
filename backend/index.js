const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectToDB = require('./config/connectToDB');

dotenv.config();

const app = express();

// Connect to MongoDB
connectToDB();

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));

// Health check
app.get('/', (req, res) => {
    res.json({ message: '✅ DocSpot API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
