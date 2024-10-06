import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/post.route.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import appRoutes  from './routes/app.route.js';
import subventionRoutes from './routes/subvention.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/app', appRoutes);
app.use('/api/subvention', subventionRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});



