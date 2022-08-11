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

var review = require("../models/review.ts")
var user = require("../models/user.ts")
var expertisePost = require("../models/expertisePost.ts")

export default dbConnect