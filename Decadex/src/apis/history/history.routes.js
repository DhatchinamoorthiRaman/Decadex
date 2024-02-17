
import {  historyHomeController } from "./history.controllers.js";
import authenticate from "../../middleware/authentication.js";


async function historyRoutes(fastify,options){
    fastify.post("/historyHome",{preHandler:authenticate},historyHomeController)
}

export{historyRoutes};