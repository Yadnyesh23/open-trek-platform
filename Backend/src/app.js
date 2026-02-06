import express from 'express';
import cors from 'cors'

// App Initiated
const app = express();


//middlerwares
app.use(cors())
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