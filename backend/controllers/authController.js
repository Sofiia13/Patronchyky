const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const orgModel = require('../models/organizationModel');

const {createToken} = require('../JWT/JWT');
const organizationModel = require('../models/organizationModel');

const createOrganization = async (req, res) => {
  const { reqUsername, reqPassword, reqDescription, reqEmail } = req.body;
  console.log(reqUsername);
  try {
    const userExists = await userModel.findOne({
      $or: [{ name: reqUsername }, { email: reqEmail }],
    });
    const orgExists = await orgModel.findOne({
      $or: [{ name: reqUsername }, { email: reqEmail }],
    });

    if (userExists || orgExists) {
      return res
        .status(400)
        .json({ error: "Користувач з таким ім'ям або email вже існує" });
    }
    const hashedPass = await bcrypt.hash(reqPassword, 10);
    const newOrg = new orgModel({
      name: reqUsername,
      password: hashedPass,
      description: reqDescription,
      email: reqEmail,
      verified: true,
    });
    await newOrg.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send(error);
  }
}
const createUser = async (req, res) => {
  const { reqUsername, reqPassword, reqEmail } = req.body;
  try {
    // const whitespaceSym = /\s/;

    // if (
    //   !reqUsername.trim() ||
    //   whitespaceSym.test(reqUsername) ||
    //   !reqPassword.trim() ||
    //   whitespaceSym.test(reqPassword) ||
    //   !reqEmail.trim() ||
    //   whitespaceSym.test(reqEmail) ||
    //   !reqUniversity.trim()
    // ) {
    //   return res
    //     .status(400)
    //     .json({ error: "Заповни всі поля або прибери пробіли з полів" });
    // }

    const userExists = await userModel.findOne({
      $or: [{ name: reqUsername }, { email: reqEmail }],
    });
    const orgExists = await orgModel.findOne({
      $or: [{ name: reqUsername }, { email: reqEmail }],
    });

    if (userExists || orgExists) {
      return res
        .status(400)
        .json({ error: "Користувач з таким ім'ям або email вже існує" });
    }

    const hashedPassword = await bcrypt.hash(reqPassword.trim(), 10);

    const newUser = await userModel.create({
      name: reqUsername,
      password: hashedPassword,
      email: reqEmail,
      verified: true,
      location: {
        type: "Point",
        coordinates: [300, 24242],
      },
    });

    await userModel.create(newUser);
    console.log("Користувач створений");

    const createdUser = await userModel.findOne({ name: reqUsername.trim() });

    if (!createdUser) {
      return res
        .status(500)
        .json({ error: "Внутрішня помилка сервера під час роботи з БД." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Під час реєстрації виникла помилка:", error);
    return res.status(500).json({ error: "Внутрішня помилка сервера." });
  }
};


const login = async(req, res)=>{
  const {reqEmail, reqPassword} = req.body;
  let account = await userModel.findOne({email: reqEmail});
  if(!account){
    account = await orgModel.findOne({email: reqEmail});
  }
  try {
    if(!account){
      return res.status(400).json({error: "Користувача з таким email не існує"})
    }
    const hashedPass = account.password;
    await bcrypt.compare(reqPassword, hashedPass).then((match)=>{
        if(!match){
           return  res.status(400).json({error: "Некоректна комбінація логіну та паролю"});
        }
        else{
            const accessToken = createToken(account);
            res.cookie("access-token", accessToken, {
              maxAge: 60 * 60 * 24 * 30 * 1000,
              domain: 'localhost', 
              sameSite: 'Lax'
          });
            console.log(accessToken);
            res.status(200).json({success: true})
        }
  })
  } catch (error) {
    return res.status(500).json({error: 'Помилка серверу'});
  }
};



module.exports = {
    createOrganization,
    createUser,
    login
};
