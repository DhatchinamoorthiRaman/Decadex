import fastifyPassport from '@fastify/passport';
import { loginGoogleService } from '../apis/auth/auth.service.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv"
import { GOOGLECALLBACK, GOOGLECLIENTID, GOOGLECLIENTSECRET} from '../constants/redirect.js';
dotenv.config()
fastifyPassport.use(new GoogleStrategy({
    clientID: GOOGLECLIENTID,
    clientSecret: GOOGLECLIENTSECRET,
    callbackURL:GOOGLECALLBACK
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
        
        const user = await loginGoogleService(profile.emails?.[0]?.value)
        if(user){
            
            return cb(null,user)
        }
        
    } catch (error) {
        console.log(`Problem In Authenticating User ${error}`);
        throw new Error(error);        
    }
   
  }
));

fastifyPassport.registerUserSerializer(async (user, req) => {
    return user
})
fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user
})

export { fastifyPassport }