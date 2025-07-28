const User = require('../models/user.models');




async function createUserRepo(data1) {
  try {
    const { name, email, password, role } = data1;
    const newUser = await User.create({ name, email, password, role });
    return newUser;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}



async function findUser() {
    try {
        const user = await User.find();
        return user;
    }
    catch (error) {
        throw new Error("Internal Server Error")
    }
}

async function deleteUser(id) {
    try {
        const user = await User.findById(id);
        return user;
    }
    catch (error) {
        throw new Error("Internal Server Error")
    }

}

async function updateUser(id, data) {
    try {
        const { name, email,password } = data;
        return await User.findByIdAndUpdate(id,
      { name, email, password }, 
      { new: true }
    );
    }
    catch (error) {
        throw new Error("Internal Server Error")

    }
}


async function getUserByEmail(email) {
    try {
        const user = await User.findOne({email});
        
        return user;
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}

async function getUserById(id) {
    try {
        const user = await User.findById(id);
        console.log(user)
        return user;
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}


module.exports = { findUser, deleteUser, updateUser, createUserRepo, getUserByEmail, getUserById };
