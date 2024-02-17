
import { historyHomeServices, historyServices } from "./history.services.js";
import { sendError, sendResponse } from "../../../utils/responseUtil.js";

async function historyHomeController(request,reply){
    try {
        const date = request.body.date;
        const user_id = request.body.user_id || request.id
        const page = request.body.page;
        const pageSize = request.body.pageSize;
        
        const data = await historyHomeServices(user_id,date,page,pageSize)
        if(data){
            return sendResponse(reply,200,data);
        }
    } catch (error) {
        console.log('error occured in historyHomecontroller',error);
        return sendError(reply,404,error);
        
    }

}

export {historyHomeController}