// Import express package
import express from 'express';
// import morgan package for logs
import logger from 'morgan';

// import mongoose driver
import mongoose from 'mongoose';

// imprort dotenv
import env from 'dotenv';
import path from 'path';

// import cors 
import cors from 'cors';

const envFile = process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env';
env.config({
    path: `${__dirname}/environments/${envFile}`
})


// Connect to mongoose
mongoose.connect(
    process.env.MONGO_URL + '/' + process.env.DB_NAME, {
        useNewUrlParser: true
    }
)
    .then((db) => {
        console.log("Connected to db =====>");
    })
    .catch((error) => {
        console.log("Not connected.Error occured ======>", error)
    })

// create express objec
const app = express();

// logger middleware
app.use(logger('dev'));

// body parser middleware
app.use(express.json());

// url encoded
app.use(
    express.urlencoded({
        extended: true
    })
)

// public path
app.use(express.static(path.join(__dirname, 'public')))

// header middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Content-type, Authorization'
    );
    next();
})

// cors middleware

app.options('*', cors())

// routes
require('./routes/job-post')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public') + '/index.html')
})

// error function

app.use((req, res, next) => {
    const err = new Error();
    err.message = 'Not Found';
    err.status = 404;
    next(err);
});

// error middle ware
app.use((err, req, res, next) => {
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500)
        .json({
            status: false,
            error: err,
            code: err.status || 500
        })
        .end();

    next();
});


app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});