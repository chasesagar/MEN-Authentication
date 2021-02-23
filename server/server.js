// imports
import CONFIG from './../config/config.js';
import app from './express.js';
import mongoose from 'mongoose';

// Setting up connection to database
mongoose.Promise = global.Promise // initilizing mongoose
mongoose.connect(CONFIG.mongoUri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${CONFIG.mongoUri}`)
})

app.listen(CONFIG.port, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`Server running on port: ${CONFIG.port}`)
})