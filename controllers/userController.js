const User = require('../models/user.models');

async function createUser(req, res){
  const { username, email, password } = req.body;
  const errors = [];



  
  if (!username || username.length < 3 || username.length > 20) {
    errors.push("Username must be between 3 and 20 characters.");
  }


  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please provide a valid email address.");
  }

 
  

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain at least one letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  res.status(201).json({
    message: 'User created successfully!',
    user: { username, email, password },  
  });
}


async function getAllUsers(req, res){
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error in showing user", error: error.message });
  }
};


async function deleteUser(req,res){
  try{
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if(!deletedUser){
      res.status(404).json({message : "user not found", user : deletedUser})
    }
      res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error in deleting user", error: error.message });
  }
  }

async function updateUser(req,res){
  try{
    const userId = req.params.id;
    const {name,email,password} = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId,{name,email,password},{ new: true, runValidators: true });
    if(!updatedUser){
      return res.status(404).json({message : "user not found"})
    } 
    res.status(200).json({message : "user Updated", updateUsers: updatedUser })
    }
    catch(error){
      console.log(error)
      res.status(500).json({ message: "Error in updating user", error: error.message });
    }
}
  
module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser
};