const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routers/router");
const connectDB = require("./config/connectDB");


const app = express();

// parse JSON and form bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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