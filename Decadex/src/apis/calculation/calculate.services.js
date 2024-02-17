import { addHistory } from "../../dao/history.dao.js";
import { v4 as uuidv4 } from "uuid";
import { resultConverter } from "../../../utils/resultConverter.js";
import { getRuleName } from "../../dao/rule.dao.js";
async function calculationService(args) {
  try {
      const{ rule_id, input_1, input_2, user_id } = args;
      const history_id = uuidv4();
      var result;
      switch (rule_id) {
        case 6:
          var constant = 72;
          result = resultConverter(rule_id, input_1,constant, input_2);
        
          break;
        case 7:
          var constant = 114;
          result = resultConverter(rule_id, input_1,constant, input_2);
          
          break;
        case 8:
          var constant = 144;
          result = resultConverter(rule_id, input_1,constant, input_2);
          break;
        case 9:
          var constant = 70;
          result = resultConverter(rule_id, input_1,constant, input_2);
          
          break;
        case 1:
          result = resultConverter(rule_id, input_1);
          break;
        case 2:
          result = resultConverter(rule_id, input_1,0,input_2);
          
          break;
        case 3:
          result = resultConverter(rule_id, input_1,0,input_2);
        
          break;
        case 4:
          result = resultConverter(rule_id, input_1,0,input_2);
         
          break;
        case 10:
          result = resultConverter(rule_id, input_1,0,input_2);
          
          break;
        case 5:
          result = resultConverter(rule_id, input_1);
        
          break;    
        default:
            throw new Error("invalid rule_id")

        
      }
      const rule = await getRuleName(rule_id);
      const rule_name = rule.rule_name
      await addHistory({ rule_id,rule_name,user_id,history_id,result });
      return result;
    
  } catch (error) {
    console.log("error occured from calculationservice",error)
    throw new Error(error);    
  }
}
export { calculationService };
