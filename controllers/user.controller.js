
const { getAllUserService, deleteOneUserService, updateOneUserService, createOneUserService, loginOneUserService  } = require('../service/user.service');

async function createUser(req, res) {
  try {
    const newUser = await createOneUserService(req.body);
    
    return res.status(201).json({
      code: 201,
      metadata: {},
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      code: 500,
      message: 'Error during registration',
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const token = await loginOneUserService(req.body);
    return res.status(200).json({
      code: 200,
      metadata: {},
      message: 'Login successful',
      data: { token }
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: 'Login failed',
      error: error.message
    });
  }
}
async function getAllUser(req, res) {
    try {
        const users = await getAllUserService();
        return res.status(200).json({ code: 200, metadata: {}, message: "Users fetched successfully", data: users });
    } catch (error) {

        return res.status(500).json({ code: 500, message: error.message });
    }
}

async function deleteOneUser(req, res) {
    try {
        const deletedUser = await deleteOneUserService(req.params.id);
       
        return res.status(200).json({ code: 200, metadata: {}, message: "User deleted", data: deletedUser });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ code: 500, message: error.message });
    }
}

async function updateOneUser(req, res) {
    try {
        const updatedUser = await updateOneUserService(req.params.id, req.body);
        
        return res.status(200).json({ code: 200, metadata: {}, message: "User updated", data: updatedUser });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message });
    }
}



module.exports = { getAllUser, deleteOneUser, updateOneUser, createUser,loginUser };
