
import { calculationController } from "./calculate.controllers.js";
import authenticate from "../../middleware/authentication.js"

async function calcRoutes(fastify,options){

    fastify.post("/calculation",{preHandler: authenticate},calculationController);
 
 
}

export {calcRoutes};