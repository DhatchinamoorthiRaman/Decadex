import { prisma } from "../../utils/prisma.js";

async function getRuleName(rule_id){
    try {
        const result = await prisma.rules.findFirst({
            where:{
                rule_id,
            }
        })
        return result;        
    } catch (error) {
        console.log("error occured in getRuleName dto",error);
        throw new Error(error);        
    }

    
}
export{getRuleName}