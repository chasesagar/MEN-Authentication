//imports

import express from 'express'
import bodyParser from 'body-parser' // Request body-parsing middleware to handle the complexities of parsing streamable request objects so that we can simplify browser-server communication by exchanging JSON in the request body
import cookieParser from 'cookie-parser' //  Cookie parsing middleware to parse and set cookies in request objects
import compress from 'compression' //  Compression middleware that will attempt to compress response bodies for all requests that traverse through the middleware
import cors from 'cors' // Middleware to enable cross-origin resource sharing (CORS)
import helmet from 'helmet' //  Collection of middleware functions to help secure Express apps by setting various HTTP headers
import Template  from "./../template.js"; 
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express() // configure express

// Prase body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Cookie parsing middleware
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// mounting routes
app.use('/', authRoutes)
app.use('/', userRoutes)

// Default template send
app.get('/', (req, res) => {
    res.status(200).send(Template())
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
})

export default app;
