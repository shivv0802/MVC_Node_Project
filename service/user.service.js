const { findUser, deleteUser, updateUser, createUserRepo, getUserByEmail, getUserById } = require('../repository/user.repository');
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt.utils')

async function createOneUserService(data) {
    try {
        const { name, email, password, role } = data;
        const hashedPassword = await bcryptPasswordGenerate(password);

        const user = await createUserRepo({
            name,
            email,
            password: hashedPassword,
            role
        });

        if(!user){
            throw new Error("Error in creating user")
        }
        return user;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
}

async function loginOneUserService(data) {
    try {
        const { email, password } = data;
        
        const user = await getUserByEmail(email);
       
        if (!user) throw new Error("User not found");
       

        const isMatch = await bcryptPasswordCheck(password,user.password)
        if (!isMatch) throw new Error("Invalid password");
    

        const token = generateToken({ id: user._id, role: user.role });
    
        return token;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error")
    }
}



async function getAllUserService() {
    try{
        const fetchedUser = await findUser();
        if(!fetchedUser){
            throw new Error("Error in fetching user")
        }
        return fetchedUser;
    } catch(error){
        throw new Error(error.message || "Internal Server Error")
    }
}

async function deleteOneUserService(id) {
    try{
    const getUser = await getUserById(id);
    if (!getUser) {
        // Not found
        throw new Error({ code: 404, message: "User not found." });
    }
    return await deleteUser(id);
} catch (error) {
        throw new Error(error.message || "Internal Server Error")
    }
}

async function updateOneUserService(id, data) {
    try{
    const { password } = data;
    const hashedPassword = await bcryptPasswordGenerate(password)
   
    const getUser = await getUserById(id);
    if (!getUser) {
        throw new Error("User not found.");
    }
    
  return await updateUser(id, {
    ...data,
    password: hashedPassword,
  });

} catch(error){
    throw new Error("Internal Server Error")
}
}

async function bcryptPasswordCheck(inputPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        if (!isMatch) throw new Error('Invalid Password');
        return true;
    } catch (error) {
        throw new Error("Error in bcrypt pass")
    }
}
    





async function bcryptPasswordGenerate(pwd) {
   
    try {
       
        const pass = await bcrypt.hash(pwd, 10);
        return pass;
    } catch (error) {
        throw new Error("error in generating bcrypted password")
    }
}


module.exports = { getAllUserService, deleteOneUserService, updateOneUserService, createOneUserService, loginOneUserService };
