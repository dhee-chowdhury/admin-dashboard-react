const User = require("../models/userModel");
const mongoose = require("mongoose");

// get a single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUser;
