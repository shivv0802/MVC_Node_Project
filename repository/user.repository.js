const User = require('../models/user.models');
const BadRequest = require('../errors/BadRequest')




async function createUserRepo(data) {
  try {
    return await User.create(data);
  } catch (error) {
    throw error;
  }
}



async function findUser() {
    try {
        return await User.find();
    
    }
    catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
    try {
        return await User.findById(id);
    
    }
    catch (error) {
        throw error;
    }

}

async function updateUser(id, data) {
    try {
        
        const { name, email, password, role } = data;

        return await User.findByIdAndUpdate(
            id,
            { name, email, password, role },
            { new: true }
        );

     
    } catch (error) {
      
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
      return await User.findOne({email});
        
       
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
   
    try{
        return await User.findById(id);
    
    } catch (error) {
      throw error;
    }
}


module.exports = { findUser, deleteUser, updateUser, createUserRepo, getUserByEmail, getUserById };
