import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import viewRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import keyRouter from './routes/keys.router.js';

import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';
import config from './config/config.js';
//const url = 'mongodb://localhost:27017';
const app = express();
const PORT = config.port.PORT;
const connection = mongoose.connect(process.env.MONGO_URL) 

// MIDDLEWARES --
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/assets`));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// PASSPORT --
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// HANDLEBARS --
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// ROUTERS --
app.use('/', viewRouter);
app.use('/api/sessions/', sessionRouter);
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);
app.use('/api/keys', keyRouter);

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))



