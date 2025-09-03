async function registerUser(req, res) {
    try {
        const {name, email, password,profile_Pic} = req.body;

        const checkEmail = await UserModel.findOne({email});
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = registerUser;
