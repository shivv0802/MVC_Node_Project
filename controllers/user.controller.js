
const { getAllUserService, deleteOneUserService, updateOneUserService, createOneUserService, loginOneUserService  } = require('../service/user.service');
const BaseController = require('../controllers/baseController')
const basecontroller = new BaseController();

async function createUser(req, res, next) {
  try {
    const newUser = await createOneUserService(req.body);
    
    return res.status(201).json(basecontroller.sendJSONResponse(res,{},"User Registered Successfully",{data:newUser}));
  } catch (error) {
     sendErrorResponse(res,error)
  }
}

async function loginUser(req,res ,next) {
  try {
    const token = await loginOneUserService(req.body);
   

    return res.status(200).json(basecontroller.sendJSONResponse(res,{},"Logged in successfully",{data: token}));
  } catch (error) {
      sendErrorResponse(res,error)
  }
}
async function getAllUser(req, res, next) {
    try {
        const users = await getAllUserService();
        return res.status(200).json(basecontroller.sendJSONResponse(res,{},"User Fetched Successfully",{data:users}));
    } catch (error) {
        sendErrorResponse(res,error)
    }
}

async function deleteOneUser(req, res, next) {
    try {
        const deletedUser = await deleteOneUserService(req.params.id);
       
        return res.status(200).json(basecontroller.sendJSONResponse(res,{},"User deleted",{ data: deletedUser }));
    } catch (error) {
        sendErrorResponse(res,error)
    }
}

async function updateOneUser(req, res, next) {
    try {
        const updatedUser = await updateOneUserService(req.params.id, req.body);
        
        return res.status(200).json(basecontroller.sendJSONResponse(res,{},"User updated", {data: updatedUser }));
    } catch (error) {
      console.log(error instanceof GeneralError);
        sendErrorResponse(res,error)
    }
}



module.exports = { getAllUser, deleteOneUser, updateOneUser, createUser,loginUser };
