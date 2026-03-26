
import User from "../models/User.js";
import bcrypt from "bcrypt";

// --- LOGIN LOGIC ---
export const loginUser = async (req, res) => {
  try {
    // 1. Search for the user using the Email
    const user = await User.findOne({ email: req.body.email });
    
    // If no user is found with that email, stop here
    if (!user) {
      return res.status(404).json("User not found!");
    }

    // 2. Validate Password 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (!validPassword) {
      return res.status(400).json("Wrong password!");
    }

    // 3. Success! Send the user data back to the frontend
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json(err);
  }
};
// --- REGISTER LOGIC ---
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("An account with this email already exists!");
    }

    // 2. Hash the password for security
    // The '10' is the salt rounds (how many times it scrambles the data)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user object
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // 4. Save to MongoDB
    const savedUser = await newUser.save();

    // 5. Send the created user back to the frontend (excluding the password)
    const { password: userPassword, ...otherDetails } = savedUser._doc;
    res.status(201).json(otherDetails);

  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to register user. Check server logs.");
  }
};