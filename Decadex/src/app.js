import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyPassport from '@fastify/passport'
import fastifySecureSession from '@fastify/secure-session'
import { randomBytes } from 'crypto'
import { authRoutes } from "./apis/auth/auth.routes.js";
import { calcRoutes } from "./apis/calculation/calculate.routes.js";
import { historyRoutes } from "./apis/history/history.routes.js";
import dotenv from 'dotenv';

dotenv.config();

const server = Fastify();

server.register(fastifyCors,{
    origin:['http://localhost:5173','http://localhost:4000', 'http://192.168.43.55:4000'],
    credentials:true,

})

const secret = randomBytes(32).toString('hex')
server.register(fastifySecureSession, {
    key: Buffer.from(secret, 'hex'),
    cookie: {
        path: '/'
    }
})

server.register(fastifyPassport.initialize())
server.register(fastifyPassport.secureSession())


server.register(authRoutes)
server.register(calcRoutes)
server.register(historyRoutes)

async function main(){
    try {
        await server.listen(4000,"0.0.0.0");
        console.log("server is running on port 4000")
       
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}
main();