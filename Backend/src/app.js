import express from 'express';
import cors from 'cors'

// App Initiated
const app = express();


//middlerwares
app.use(cors())
app.use(express.json())


// Routes
import healthCheckRoute from './routes/healthcheck.route.js'
import getAllTreksRoute  from './routes/treks.routes.js'
import getTrekByID  from './routes/treks.routes.js'
import createTrek  from './routes/treks.routes.js'

app.use('/api', healthCheckRoute)
app.use('/api', getAllTreksRoute)
app.use('/api', getTrekByID)
app.use('/api', createTrek)


export default app;