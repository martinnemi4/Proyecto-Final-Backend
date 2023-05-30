import dotenv from 'dotenv';

dotenv.config();

export default {
    port:{
        PORT: process.env.PORT || 8080
    },
    app:{
        ADMIN_USER: process.env.USER,
        ADMIN_PWD: process.env.PWD
    },
    mongo: {
        URL: process.env.MONGO_URL
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET
    },
    session: {
        SESSION: process.env.SESSION
    },
    nodemailer: {
        GUSER : process.env.GMAIL_USER,
        GPWD : process.env.GMAIL_PWD
    }
}