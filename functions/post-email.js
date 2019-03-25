const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
import querystring from 'querystring';

const app = express();
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'preflightContinue': 'true',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

exports.handler = function (event, context, callback) {
    console.log(event.httpMethod);

    if (event.httpMethod !== "POST") {
        console.log('not allowed');
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const data = event.body;
    console.log('email received', data);
    const params = querystring.parse(event.body);
    console.log('new email', params);
    console.log('from', data.formName);

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });
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