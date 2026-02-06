import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(
            `Database connected successfully 🟢\n` +
            `DB Host: ${conn.connection.host}\n` +
            `DB Name: ${conn.connection.name}`
        )
    } catch (error) {
        console.error('❌ Database connection failed')
        console.error(error.message)
        process.exit(1)
    }
}

export default connectDB
