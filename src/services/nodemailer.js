import nodemailer from 'nodemailer';
import config from '../config/config.js';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'marbeauvais17@gmail.com',
        pass: 'hfjlarqkhurmuwwz'
    },
    tls: {
        rejectUnauthorized: false
    }
});