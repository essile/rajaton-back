const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
import querystring from 'querystring';

const app = express();
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

exports.handler = function (event, context, callback) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const params = querystring.parse(event.body);
    const data = params.body;

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });
    console.log('received message', data.formMessage);
    console.log(process.env.email);
    smtpTransport.sendMail({
        from: `${data.formName} <${data.formEmail}>`,
        to: `Rajaton <rajatonproducts@gmail.com>`,
        subject: `A message trough Rajaton webstore: ${data.formSubject}`,
        html: `Message: ${data.formMessage}
             Sender: ${data.formName}, ${data.formEmail}`
    }, function (error, response) {
        if (error) {
            smtpTransport.close();
            console.log('error', error);
            return {
                statusCode: 500,
                body: 'sending the message failed'
            };
        }
        smtpTransport.close();
        console.log('worked');
        return {
            statusCode: 200,
            body: 'sending the message worked'
        };
    });
}