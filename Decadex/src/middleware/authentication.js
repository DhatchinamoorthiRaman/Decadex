
import jwt from "jsonwebtoken"
import { sendError } from "../../utils/responseUtil.js";
import dotenv from 'dotenv';

dotenv.config();

const authenticate =  (request, reply, done) => {
    const token = request.cookies.token;
    
    if(!token){
        const message = "token not found"
        return sendError(reply,404,message);
    }
    else{
        jwt.verify(token,process.env.JWTSECRET, (err, decoded) => {
            if (err) {
                console.log(err);

                if (err.message.includes("jwt expired")) {
                    const message = "jwt expired"
                    return sendError(reply,404,message)
                }
                if (err.message.includes("invalid token")) {
                    const message = "invalid token"
                    return sendError(reply,404,message)
                }
            }
            else {
              
                request.id = decoded.id
               
                // done(); // Call done() here
            }
        })
    }
    done();
}


export default authenticate;