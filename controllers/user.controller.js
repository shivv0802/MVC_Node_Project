
const { getAllUserService, deleteOneUserService, updateOneUserService, createOneUserService, loginOneUserService  } = require('../service/user.service');
const BaseController = require('../controllers/BaseController')
const basecontroller = new BaseController();

const Mobile = require('../models/mobile.models');
const User = require('../models/user.models');

async function createMobile(req, res) {
  try {
    const { number, user } = req.body;
    const mobile = await Mobile.create({ number, user });
    await User.findByIdAndUpdate(user, { $push: { mobiles: mobile._id } });
    res.status(201).json(mobile);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}



async function createUser(req, res, next) {
  try {
    const newUser = await createOneUserService(req.body);
    
    return basecontroller.sendJSONResponse(res,{},"User Registered Successfully",{data:newUser});
  } catch (error) {
     return basecontroller.sendErrorResponse(res,error)
  }
}

async function loginUser(req,res ,next) {
  try {
    const token = await loginOneUserService(req.body);
   

    return basecontroller.sendJSONResponse(res,{},"Logged in successfully",{token});
  } catch (error) {
      basecontroller.sendErrorResponse(res,error)
  }
}
async function getAllUser(req, res, next) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
        const result = await getAllUserService(page,limit);
        return basecontroller.sendJSONResponse(res,{page : result.page, limit : result.limit},"User Fetched Successfully",{users : result.users, totalPages : result.totalPages, totalUsers : result.totalUsers });
    } catch (error) {
       return basecontroller.sendErrorResponse(res,error)
    }
}

async function getUserWithMobiles(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('mobiles','number');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
    
      mobiles: user.mobiles.map(m => m.number) // returns array of mobile numbers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteOneUser(req, res, next) {
    try {
        const deletedUser = await deleteOneUserService(req.params.id);
       
        return basecontroller.sendJSONResponse(res,{},"User deleted",{ data: deletedUser });
    } catch (error) {
        return basecontroller.sendErrorResponse(res,error)
    }
}

async function updateOneUser(req, res, next) {
    try {
        const updatedUser = await updateOneUserService(req.params.id, req.body);
        
        return basecontroller.sendJSONResponse(res,{},"User updated", {data: updatedUser });
    } catch (error) {
      
        return basecontroller.sendErrorResponse(res,error)
    }
}



module.exports = { getAllUser, deleteOneUser, updateOneUser, createUser,loginUser, getUserWithMobiles, createMobile };
