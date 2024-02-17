
import { calculationService } from "./calculate.services.js";
import { sendError, sendResponse } from "../../../utils/responseUtil.js";
async function calculationController(request,reply){
    try {
        
        const rule_id = +request.query.rule_id;  
        const {input_1,input_2} = request.body;
        const user_id = request.body.user_id || request.id
        const data = await calculationService({input_1,input_2,user_id,rule_id})
        sendResponse(reply,200,"calculated resulted",data)
    } catch (error) {
        console.log("error from calculationcontroller",error)
        sendError(reply,404,error);        
    }
     



}
export {calculationController}