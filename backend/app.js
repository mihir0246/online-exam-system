const PORT = process.env.PORT || 5000;
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require("./services/passportconf");
const tool = require("./services/tool");
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require("csrf-csrf");

const app = express();

app.use(cookieParser());
app.use(helmet());

app.use((req, res, next) => {
    const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin, Authorization, x-csrf-token");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

const {
    invalidCsrfTokenErrorMiddleware,
    generateToken,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || "a-very-secret-string",
    cookieName: "x-csrf-token",
    cookieOptions: {
        httpOnly: false, // Must be accessible by client to send back in header
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
    },
    size: 64,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
    getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

app.get("/api/v1/csrf-token", (req, res) => {
    res.json({ token: generateToken(req, res) });
});

app.use(invalidCsrfTokenErrorMiddleware);

// Routes
const mongoose = require("./services/connection");
const admin = require("./routes/admin");
const login = require("./routes/login");
const user = require("./routes/user");
const universal = require("./routes/universal");
const question = require("./routes/questions");
const testpaper = require("./routes/testpaper");
const up = require("./routes/fileUpload");
const trainee = require("./routes/trainee");
const stopRegistration = require("./routes/stopRegistration");
const results = require("./routes/results");
const dummy = require("./routes/dummy");

// Configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// Passport
app.use(passport.initialize());

// Bind Routes
app.use("/api/v1/admin", doubleCsrfProtection, passport.authenticate('user-token', { session: false }), admin);
app.use("/api/v1/user", doubleCsrfProtection, passport.authenticate('user-token', { session: false }), user);
app.use('/api/v1/subject', doubleCsrfProtection, passport.authenticate('user-token', { session: false }), universal);
app.use('/api/v1/questions', doubleCsrfProtection, passport.authenticate('user-token', { session: false }), question);
app.use('/api/v1/test', doubleCsrfProtection, passport.authenticate('user-token', { session: false }), testpaper);
app.use('/api/v1/upload', doubleCsrfProtection, passport.authenticate('user-token', { session: false }), up);
app.use('/api/v1/trainer', doubleCsrfProtection, passport.authenticate('user-token', { session: false }), stopRegistration);
app.use('/api/v1/trainee', doubleCsrfProtection, trainee);
app.use('/api/v1/final', doubleCsrfProtection, results);
app.use('/api/v1/lala', doubleCsrfProtection, dummy);
app.use('/api/v1/login', doubleCsrfProtection, login);

// Health check route for AWS Elastic Beanstalk
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Error handling
app.use((req, res, next) => {
    next(createError(404, "Invalid API. Use the official documentation to get the list of valid APIS."));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`Server Started. Server listening to port ${PORT}`);
});