const express = require('express');
const cors = require('cors');
const productList = require('../product/productJSON.json');

const app = express();
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

exports.handler = function (event, context, callback) {
    console.log(JSON.stringify(productList));
    callback(null, {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(productList)
    })
}