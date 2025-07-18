const User = require('../models/user.models');

async function createUser(req, res){
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    console.log(err)
    res.status(400).json({message: "error in creating user", error: err.message });
  
  }
};


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