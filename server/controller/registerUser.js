const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(req, res) {
    try {
        const {name, email, password, profile_Pic} = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "name, email and password are required",
                error: true,
                success: false
            });
        }

        const checkEmail = await UserModel.findOne({email});

        if(checkEmail){
            return res.status(400).json({
                message: "Email already exists",
                error: true
            });
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const payload = {
            name,
            email,
            password: hashedPassword,
            profile_Pic
        }

        const user = new UserModel(payload);
        const usersaved = await user.save();

        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            data: usersaved,
            success: true 
        });
    } catch (error) {
        if (error?.code === 11000) {
            return res.status(400).json({ message: "Email already exists", error: true, success: false });
        }
        console.error("registerUser error:", error);
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}

module.exports = registerUser;
