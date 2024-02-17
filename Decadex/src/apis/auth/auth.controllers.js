
import { loginGoogleVerifyService,  loginService, loginVerifyService} from "./auth.service.js";
import {sendError, sendResponse} from "../../../utils/responseUtil.js"
import dotenv from 'dotenv';
dotenv.config();




async function loginController(request,reply){
    try {
        const email = request.body.email;
        
        const data= await loginService(email);
        if(data.access_token){
         
            reply.setCookie("token",data.access_token,{
                path: '/',
            })
            return sendResponse(reply,200,"user verified",data);

        }
        return sendResponse(reply,200,data.message);

        
    } catch (error) {
        console.log("error from logincontroller",error);
        return sendError(reply,404,error);
    }
    
}   

async function loginVerifyController(request,reply){
    try {
        const vtoken = request.params.vtoken;
       
        const data = await loginVerifyService(vtoken);
        reply.setCookie("token",data.access_token,{
            path: '/',
            
            
        })
        reply.redirect(process.env.HOMEPAGE)

        
        
    } catch (error) {
        console.log("error from loginVerifycontroller",error);
        return sendError(reply,404,error);
        
    }

}
async function loginGoogleController(request,reply){
    try {
        const user = request.user
        const data = await loginGoogleVerifyService(user.email);
        reply.setCookie("token",data.access_token,{
            path: '/',
        })
        reply.redirect(process.env.HOMEPAGE);   

    } catch (error) {
        console.log("error occured in loginGoogleController",error)
        sendError(reply,404,error);
        
    }


}
export {loginController,loginVerifyController,loginGoogleController}

































