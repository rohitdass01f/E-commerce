const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    console.log(fullname, email, password, role);
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const duplicate = await User.findOne({ email });

    if (duplicate) {
      return res.status(400).json({ message: "Duplicate user found" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);

    const user = new User({
      fullname,
      email,
      password: hashPass,
      role: role || "user",
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful!",
      user: {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

const updateProfile = async (req, res) => {
  try {

    const { fullname, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullname, phone },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAddress = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    user.addresses.push(req.body);

    await user.save();

    res.json({
      success: true,
      addresses: user.addresses,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {

    const { addressId } = req.params;

    const user = await User.findById(req.user._id);

    const address = user.addresses.id(addressId);

    Object.assign(address, req.body);

    await user.save();

    res.json({
      success: true,
      addresses: user.addresses,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "USER NOT FOUND" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "INVALID CREDENTIALS" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateProfile,
  updateAddress,
  addAddress,
  getProfile,
  login,
};
