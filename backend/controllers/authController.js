const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");

const orgModel = require('../models/organizationModel');

const createOrganization = async (req, res) => {
  const { name, password, description, phoneNum, email } = req.body;
  try {
    const userExists = await userModel.findOne({
      $or: [{ name: name }, { email: email }],
    });
    const orgExists = await orgModel.findOne({
      $or: [{ name: name }, { email: email }],
    });

    if (userExists || orgExists) {
      return res
        .status(400)
        .json({ error: "Користувач з таким ім'ям або email вже існує" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newOrg = new orgModel({
      name: name,
      password: hashedPass,
      description: description,
      phoneNum: phoneNum,
      email: email,
      verified: true,
    });
    await newOrg.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send(error);


const createUser = async (req, res) => {
  const { reqName, reqPassword, reqEmail } = req.body;
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

    const existingUser = await userModel.findOne({ name: reqName.trim() });

    if (existingUser) {
      return res.status(400).json({ error: "Ім'я користувача вже зайняте." });
    }

    const hashedPassword = await bcrypt.hash(reqPassword.trim(), 10);

    const newUser = await userModel.create({
      name: reqName.trim(),
      password: hashedPassword,
      email: reqEmail,
      verified: true,
      location: {
        type: "Point",
        coordinates: [300, 24242],
      },
    });
    // const newUser = {
    //   name: "Roman",
    //   password: "awfaf12tfq",
    //   email: "awfawfadwa242@gmail.com",
    //   verified: true,
    //   location: {
    //     type: "Point",
    //     coordinates: [300, 24242],
    //   },
    // };
    await userModel.create(newUser);
    console.log("Користувач створений");

    const createdUser = await userModel.findOne({ name: reqName.trim() });

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

module.exports = {
    createOrganization,
    createUser
};

