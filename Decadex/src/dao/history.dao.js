
import { prisma } from "../../utils/prisma.js";

async function addHistory(args){
    try {
        const result = await prisma.history.create({
            data : args
        })
        return result;        
    } catch (error) {
        console.log("error occured in addhistory dto",error);
        throw new Error(error);        
    }

    
}


async function getUserHistory(user_id, page, pageSize) {
    try {
        
        const skip = (page - 1) * pageSize;
        const history = await prisma.history.findMany({
            distinct: ["created_at"],
            where: {
                user_id
            },
            orderBy: { updated_at: "desc" },
            skip: skip,
            take: pageSize
        })
        if (history) {
            return history;
        }
        return null

    } catch (error) {
        console.log("error occured in getUserhistory dto", error);
        throw new Error(error);
    }
}



async function getUserHistoryData(user_id,date,page,pageSize){
    try {
        
        const skip = (page - 1) * pageSize;
        const history = await prisma.history.findMany({
            where: {
                user_id,
                created_at: {
                  gte: new Date(date),
                  lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
                },
              },
              orderBy: { updated_at: "desc" },
              skip: skip,
              take: pageSize
        })
        const totalRecords = await prisma.history.count({
            where: {
                user_id,
                created_at: {
                  gte: new Date(date),
                  lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
                },
            }
        });
        if(history){
            return {history, totalRecords};
        }
        return null
        
    } catch (error) {
        console.log("error occured in getUserhistory dto",error);
        throw new Error(error);    
    }

}

export {addHistory,getUserHistory,getUserHistoryData}