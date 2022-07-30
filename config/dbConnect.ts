import mongoose from 'mongoose';

/**
 * Connect to the database
 * @returns The promise that mongoose.connect() returns.
 */
const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    mongoose.connect(`${process.env.MONGODB_URI}`)
}

require("../models/review.ts")
require("../models/user.ts")

export default dbConnect