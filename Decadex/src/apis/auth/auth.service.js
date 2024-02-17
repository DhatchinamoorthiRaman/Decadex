

import { v4 as uuidv4 } from 'uuid';
import {createAccessToken} from '../../../utils/tokenGenerator.js'
import {createUser,findUserByEmail,updateUserById,updateVerify,verifyEmail} from "../../dao/user.dao.js"
import randomstring from "randomstring"
import {transporter,mailOptions} from "../../../utils/nodemailer.js"

import dotenv from 'dotenv';

dotenv.config();

async function loginService(email){

    try {
        var result;
        const user = await findUserByEmail(email);
     
        if(user && user.verified){
            const access_token = createAccessToken(user.user_id);
            const details = {
                user_id:user.user_id,
                email,
                access_token,
            }
            result = await updateUserById(details);
            
            return result;
        }
        else if(user && (user.verified===false)){
            const access_token = createAccessToken(user.user_id);
            const verification_token = randomstring.generate({length:7,charset:"numeric"})
            const details = {
                user_id:user.user_id,
                email,
                access_token,
                verification_token
            }
            result = await updateUserById(details);
           
        }
        else{
            const user_id = uuidv4();
            const access_token = createAccessToken(user_id);
            const verification_token= randomstring.generate({length:7,charset:"numeric"})
            const details = {
                user_id,
                email,
                access_token,
                verification_token
            }
            result= await createUser(details);

        }
        

        const mailoptions = mailOptions(email,`${process.env.VERIFICATIONLINK}${result.verification_token}`);
        await transporter.sendMail(mailoptions);
        return {message:"verification mail is sent to your gmail! click to verify !!"}

    } catch (error) {
        
        throw new Error(error);
    }
}

async function loginVerifyService(vtoken){
    try {
        const user = await verifyEmail(vtoken);
      

        if(user){
           const result = await updateVerify(user.email)
        return result;
        }       

    } catch (error) {
        console.log("error from loginVerifyService",error);
        throw new Error(error);        
    }
}

async function loginGoogleService(email){
    try {
       const user = await findUserByEmail(email);
       
       if(user){
        
        return user
       }       
       else{
        const user_id = uuidv4();
        const access_token = createAccessToken(user_id);
        const use= await createUser({user_id,email,access_token});
        const user = await updateVerify(use.email);
        return user
       }
        
    } catch (error) {
        console.log("error in loginGoogleService",error);
        throw new Error(error);         
    }

}

async function loginGoogleVerifyService(email){
    try {
        const user = await findUserByEmail(email);
        if(user){
            return user;
        }

    } catch (error) {
        console.log("error in loginGoogleVerifyService",error);
        throw new Error(error); 
        
    }

}

export {loginService,loginVerifyService,loginGoogleService,loginGoogleVerifyService}