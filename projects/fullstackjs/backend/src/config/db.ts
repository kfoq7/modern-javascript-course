import mongoose from 'mongoose'

export const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!)

    const url = `${db.connection.host}:${db.connection.port}`
    console.log(`Connected to mognoDB on ${url}`)
  } catch (error) {
    console.log('Cannot connect to database')
  }
}
