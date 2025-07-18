const {check} = require('../validations/checkValidation')

const validateData = async (req,res,next)=>{

    const {username,email,password} = req.body;
    try{
      const errors =  check(username,email,password);
      if(errors.length>0){
        res.status(404).json({code : 404,message : "error found",success : "false"})
      } else{
        next();
      }
    }
    catch(err){
        res.status(500).json({code : 500,message : "internal server error",success : "false"})
    }
}


module.exports = validateData;