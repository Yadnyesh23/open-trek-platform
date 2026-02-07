import express from 'express';
import cors from 'cors'

// App Initiated
const app = express();


//middlerwares

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
app.use(express.json())


// Routes
import healthCheckRoute from './routes/healthcheck.route.js'
import getAllTreksRoute from './routes/treks.routes.js'
import getTrekByIDRoute from './routes/treks.routes.js'
import createTrekRoute from './routes/treks.routes.js'
import getMyTreksRoute from './routes/treks.routes.js'
import registerRoute from './routes/auth.route.js'
import loginRoute from './routes/auth.route.js'

app.use('/api', healthCheckRoute, getAllTreksRoute, getTrekByIDRoute, createTrekRoute, getMyTreksRoute)
app.use('/api', registerRoute, loginRoute)


export default app;