

import {loginController, loginGoogleController, loginVerifyController} from "./auth.controllers.js"
import {fastifyPassport} from "../../middleware/passport.js"

async function authRoutes(fastify,options){
    fastify.post('/user/login',loginController)
    fastify.get('/user/login/verify/:vtoken',loginVerifyController)
    fastify.get('/user/login/google',fastifyPassport.authenticate("google",{scope: ['profile', 'email']}))
    fastify.get('/user/login/google/redirect',{ preValidation: fastifyPassport.authenticate('google', { scope: ['profile', 'email'] }) },loginGoogleController)
}

export {authRoutes};