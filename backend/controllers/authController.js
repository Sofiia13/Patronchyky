const userModel = require("../models/userModel");

const createUser = async (req, res)=>{
    const newUser = {
        name: "Roman",
        password: "awfaf12tfq",
        email: "awfawfadwa242@gmail.com",
        verified: true,
        location:{
            type: 'Point',
            coordinates: [300, 24242]
        }
    }
    await userModel.create(newUser);
    console.log("Користувач створений:");
};

module.exports = {
    createUser,
};