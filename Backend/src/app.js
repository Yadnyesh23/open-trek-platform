import express from 'express';
import cors from 'cors'

// App Initiated
const app = express();


//middlerwares
app.use(cors())
app.use(express.json())

export default app;