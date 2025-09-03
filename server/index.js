const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Debug environment variables
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('=====================================');

const router = require("./routers/router");
const connectDB = require("./config/connectDB");


const app = express();

// parse JSON and form bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request/Response logging middleware
app.use((req, res, next) => {
    process.stdout.write(`\n=== ${new Date().toISOString()} ===\n`);
    process.stdout.write(`${req.method} ${req.originalUrl}\n`);
    process.stdout.write(`Body: ${JSON.stringify(req.body)}\n`);
    
    // Capture original res.json to log responses
    const originalJson = res.json;
    res.json = function(data) {
        process.stdout.write(`RESPONSE: ${JSON.stringify(data)}\n`);
        process.stdout.write(`=== END ===\n\n`);
        return originalJson.call(this, data);
    };
    
    next();
});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));


const PORT = process.env.PORT || 7000;


app.get("/", (req, res) => {
    res.json({
        message: "server is running"
    });
});

app.use('/api', router);

connectDB().then(() => {
    app.listen(PORT,() =>{
        console.log(`Server is running on port ${PORT}`);
    })
})