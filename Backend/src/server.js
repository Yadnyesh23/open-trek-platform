import app from './app.js'
import dotenv from 'dotenv'
import ApiError from './utils/ApiError.js'

dotenv.config()

const port = process.env.PORT || 5000


function startServer() {
    try {
        app.listen(port, () => {
            console.log(`Server listening on port http://localhost:${port}`);
        })
    } catch (error) {
        throw new ApiError(500, "Something went wrong in server", error.message)
    }
}

startServer()
