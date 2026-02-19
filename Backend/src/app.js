import express from 'express';
import cors from 'cors'

// App Initiated
const app = express();


//middlewares

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:3000', 
  'https://open-trek-platform-4.onrender.com' // YOUR LIVE FRONTEND URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy Error: Origin not allowed'));
    }
  },
  credentials: true
}));

// Fix #7: Removed duplicate express.json() — only keep the one with the size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
// Fix #8: Consolidated all trek routes into one import
import healthCheckRoute from './routes/healthcheck.route.js'
import treksRoute from './routes/treks.routes.js'
import authRoute from './routes/auth.route.js'

app.use('/api', healthCheckRoute)
app.use('/api', treksRoute)
app.use('/api', authRoute)


export default app;