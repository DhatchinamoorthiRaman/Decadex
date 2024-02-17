import { getUserHistory, getUserHistoryData } from "../../dao/history.dao.js"


async function historyHomeServices(user_id,date,page = 1,pageSize = 10){
    try {
        const {history, totalRecords} = await getUserHistoryData(user_id,date,page,pageSize);
        if(history){
            const totalPages = Math.ceil(totalRecords/ pageSize)
            return {result:history, totalPages}

        }
        
    } catch (error) {
        console.log("error occured in historyHomeServices",error);
        throw new Error(error);
        
    }

}

async function historyServices(user_id, page, pageSize){
    try {
        const history = await getUserHistory(user_id, page, pageSize);  
        if(history){
                const groupedHistory = history.reduce((result, record) => {
                  const date = record.created_at.toISOString().split('T')[0]; // Extract 'yyyy-mm-dd'
                  result[date] = result[date] || [];
                  result[date].push(record);
                  return result;
                }, {});
          
                return groupedHistory;
              
        }      
        else{
            return JSON.stringify({result:"no history found"})
        }
    } catch (error) {
        console.log("error occured in historyServices",error);
        throw new Error(error);
    }

   
}
export {historyServices,historyHomeServices}