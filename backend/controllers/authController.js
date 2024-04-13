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
  }
};

module.exports = {
    createOrganization,
};