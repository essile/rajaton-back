const axios = require('axios');

exports.handler = function (event, context, callback) {

    console.log(JSON.parse(event.body));
    const parsedBody = JSON.parse(event.body);
    axios({
        method: 'post',
        url: 'http://requestbin.fullcontact.com/vwgvkvvw',
        data: { test: parsedBody.formName }
    })
        .then(response => {
            callback(null, {
                statusCode: 200,
                body: "yay success",
            })
        })
        .catch(error => {
            console.log(error);
            callback(new Error('Something went wrong'));
        })
}