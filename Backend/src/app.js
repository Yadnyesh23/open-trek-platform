import express from 'express';
import cors from 'cors'

// App Initiated
const app = express();


//middlerwares
app.use(cors())
app.use(express.json())


// Routes
import healthCheckRoute from './routes/healthcheck.route.js'

app.use('/api', healthCheckRoute)


export default app;