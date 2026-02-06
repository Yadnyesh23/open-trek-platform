import app from './app.js'
import dotenv from 'dotenv'
import ApiError from './utils/ApiError.js'
import connectDB from './config/connectDB.js'

dotenv.config()

const port = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()

        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`)
        })
    } catch (error) {
        console.error('❌ Failed to start server')
        console.error(error.message)
        process.exit(1)
    }
}

startServer()
