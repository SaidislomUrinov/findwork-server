import nodemailer from 'nodemailer';
import { EMAIL_LOGIN, EMAIL_PASSWORD, SMTP } from './env.js';

export const sendActivator = async (to, path) => {
    const text = `Please click the following link to activate your account: https://ishim.uz/activate/${path}`;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Activation Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                border: 1px solid #e0e0e0;
                text-align: center;
            }
            .email-container h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .activation-code {
                font-size: 28px;
                font-weight: bold;
                color: #4B0082;
                margin: 20px 0;
                padding: 10px;
                background-color: #f0f0f0;
                border-radius: 5px;
                display: inline-block;
            }
            .email-container p {
                font-size: 16px;
                color: #555;
                margin: 10px 0;
            }
            .email-container a {
                background-color: #4B0082;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin-top: 20px;
                font-size: 16px;
            }
            .email-container a:hover {
                background-color: #3a0068;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>Activate Your Account</h1>
            <p>You are ready to setup your new ISHIM UZ account.</p>
            <p>Click the button below to activate your account.</p>
            <a href="https://ishim.uz/activate/${path}">Activate your account</a>
            <div class="footer">
                <p>If you did not expect this email, please ignore it.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Nodemailer transporter yaratish
    let transporter = nodemailer.createTransport({
        host: SMTP,
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_LOGIN,
            pass: EMAIL_PASSWORD
        }
    });

    // Elektron pochta xabarini yuborish
    return await transporter.sendMail({
        from: `"ISHIM.UZ" ${EMAIL_LOGIN}`,
        to,
        subject: "Activate Your Account",
        text: text,
        html: html
    });
};