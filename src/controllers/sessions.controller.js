import jwt from "jsonwebtoken";
import { cartService, userService } from "../dao/index.js";
import { createHash,  validatePassword} from "../services/auth.js";
import config from "../config/config.js";
import userDTO from "../dao/DTO/userDTO.js";
import session from "express-session"

const register = async(req,res) => {
    try {
        const file = req.file;
        if(!file) return res.status(500).send({status:"error", error: "Error loading the file."});
        const {firstName, lastName, email, password} = req.body;
        if(!firstName||!lastName||!email||!password) return res.status(400).send({status:"error", error:"Incomplete values."});
        const exists = await userService.getUserBy({email});
        if(exists) return res.status(400).send({status:"error",error:"The user already exist."})
        const hashedPWD = await createHash(password);
        const cart = await cartService.createCart();
        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPWD,
            cart: cart._id,
            avatar: `${req.protocol}://${req.hostname}/img/${file.filename}`,
            library: []
        }
        const result = await userService.createUser(newUser);
        res.send({status:"success",message:"Registered.", result})
    } catch (error) {
        res.status(500).send({status:"error",error:"Service's error."})
    }
};

const login = async(req,res) => {
    try {
        const user = req.user;
        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role,
            cart: user.cart
        };
        res.send({status: "success", message: "User has logged in."})
    } catch (error) {
        res.status(500).send({status:"error", error:"Service's error."})
    }
};

const loginFail = (req, res) => {
    res.send('Something went wrong.')
};

export default{
    register,
    login,
    loginFail
}