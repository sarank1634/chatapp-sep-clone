const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
    try {
        const {password, userId } =  req.body;

        // Basic validation
        if (!password || !userId) {
            return res.status(400).json({
                message: "password and userId are required",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const verifiedPassword = await bcryptjs.compare(password, user.password);

        if(!verifiedPassword){
            return res.status(400).json({
                message: "Invalid password",
                error: true,
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email,
        }
        
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        }

        return res.cookie("token", token, cookieOptions).status(200).json({
            message: "Login successfully",
            token: token,
            success: true
        })

    } catch (error) {
        console.error("checkPassword error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        });
    }
}

module.exports = checkPassword;
