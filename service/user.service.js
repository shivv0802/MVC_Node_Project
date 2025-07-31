const { findUser, deleteUser, updateUser, createUserRepo, getUserByEmail, getUserById } = require('../repository/user.repository');
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt.utils')
const BadRequest = require('../errors/BadRequest');
const InternalServerError = require('../errors/InternalServerError')
const UnauthorizedError = require('../errors/UnauthorizedError');

async function createOneUserService(data) {

    const { name, email, password, role } = data;
    const hashedPassword = await bcryptPasswordGenerate(password);

    const user = await createUserRepo({
        name,
        email,
        password: hashedPassword,
        role
    });

    if (!user) {

        throw new InternalServerError("Internal Server Error", "Something Went Wrong")
    }
    return user;

}

async function loginOneUserService(data) {

    const { email, password } = data;

    const user = await getUserByEmail(email);

    if (!user) throw new BadRequest("BadRequest", "No user is registered via this email");
    //here we can directly call the generaError class it is ok but for the reusability and maintainability 
    //we call user not found and it will also make the code cleaner


    const isMatch = await bcryptPasswordCheck(password, user.password)
    if (!isMatch) throw new UnauthorizedError("Unauthorized", "Invalid password");


    const token = generateToken({ id: user._id, role: user.role });

    return token;

}



async function getAllUserService() {

    const fetchedUser = await findUser();
    if (!fetchedUser) {
        throw new BadRequest("BadRequest", "No User Fetched")
    }
    return fetchedUser;

}

async function deleteOneUserService(id) {
  
    const getUser = await getUserById(id);
    if (!getUser) {
        // Not found
        throw new BadRequest("BadRequest", "User not Found to delete");
    }
    return await deleteUser(id);

}

async function updateOneUserService(id, data) {
  
    
    const getUser = await getUserById(id);
   
    if (!getUser) {

        throw new BadRequest("BadRequest", "User not Exist");
    }


    const { password } = data;
    const hashedPassword = await bcryptPasswordGenerate(password)

    return await updateUser(id, {
        ...data,
        password: hashedPassword,
    });


}

async function bcryptPasswordCheck(inputPassword, hashedPassword) {

    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    if (!isMatch) throw new UnauthorizedError("Unauthorized", "Invalid Password");
    return true;
}






async function bcryptPasswordGenerate(pwd) {

    const pass = await bcrypt.hash(pwd, 10);
    return pass;

}


module.exports = { getAllUserService, deleteOneUserService, updateOneUserService, createOneUserService, loginOneUserService };
