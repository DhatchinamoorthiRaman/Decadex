
import {prisma} from "../../utils/prisma.js";



async function createUser(details){
    try {
       const user = await prisma.user.create({
            data:details
        })
        return user
    } catch (error) {
        console.log("error from user.dao/createUser",error)
        throw new Error(error)
    }
}

async function verifyEmail(vtoken){
    try {
        const user = await prisma.user.findFirst({
            where:{
                verification_token:vtoken
            }
        })
        
        if(user){
            return user 
        }
        else{
            throw new Error("verification failed");
        }
    
    } catch (error) {
        console.log("error from user.dao/verifyEmail",error)
        throw new Error(error)
        
    }
}
async function updateVerify(email){
    try {
        const result = await prisma.user.update({
            where:{email},
            data:{verified:true},
        })
        if(result){
           
            return result;
        }
        throw new Error("cannot update user as verified")
        
    } catch (error) {
        console.log("error occured in updateVerify dao",error);
        throw new Error(error);        
    }

}
async function findUserByEmail(email){
    try {
        const user = await prisma.user.findUnique({
            where:{
                email,
            }
        })
        if(user){
            return user
        }
        return null
    } catch (error) {
        console.log("error from user.dao/findUserByEmail",error)
        throw new Error(error)
        
        
    }
}

async function updateUserById(details){
    try {
        const user = await prisma.user.update({
            where:{
                email:details.email,
            },
            data:details
        })
        return user
        // if(user){
        // }
        // throw new Error("cannot update user as verified")

        
        
    } catch (error) {
        console.log("error occured in updateuserbyid dao",error);
        throw new Error(error); 
        
    }



}
export{createUser,verifyEmail,findUserByEmail,updateVerify,updateUserById}