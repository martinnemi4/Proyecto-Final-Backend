import passport from "passport";
import local from 'passport-local';
import config from "./config.js";
import { userService } from "../dao/index.js";
import { createHash, validatePassword } from "../services/auth.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email'},
    async(req,email,password,done)=>{
        try {
        const {firstName, lastName} = req.body;
        if(!firstName||!lastName||!email||!password) return done(null,false,{message:'faltan valores'})
        //revisar si existe el usuario
        const exists = await userService.getUserBy({email});
        if(exists) return done(null,false,{message:'usuario ya existente'})
        //meter a la base
        const newUser = {
            firstName,
            lastName,
            email,
            password:createHash(password),
            thumbnail
        };
        let result = await userService.createUser(newUser);
        return done(null,result);

        } catch (error) {
            done(error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField:'email'}, async(email,password,done) => {
        if(email===config.app.ADMIN_USER&&password===config.app.ADMIN_PWD){
            return done(null,{_id:0, firstName:"admin", role:"admin"});
        };
        const user = await userService.getUserBy({email});
        if(!user) return done(null,false,{message:"The user does not exist."});
        const isValidPWD = await validatePassword(password, user.password);
        if(!isValidPWD) return done(null,false,{message:"Incorrect password."});
        return done(null,user);
    }))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};

export default initializePassport;