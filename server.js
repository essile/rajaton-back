const express = require('./client/node_modules/express');
const cors = require('./client/node_modules/cors');
const bodyParser = require('./client/node_modules/body-parser');
const nodemailer = require('./client/node_modules/nodemailer');
const Stock = require('./stock/stock');
const productList = require('./product/productJSON.json');

const app = express();
const port = process.env.PORT || 1234;

const { EMAIL, PW } = require('./config');
const stock = new Stock();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));


app.get('/api/hello', (req, res) => {
  res.json({ test: 'Hello' });
});

app.get('/api/shop-window-products', (req, res) => {
  res.json(productList);
});

app.post('/api/new-email', (req, res) => {
  var data = req.body;

  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL,
      pass: PW
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
      console.log(error);
      res.json({ response: 'fail', messageSent: data });
    } else {
      console.log("Message sent: " + data.formMessage);
      res.json({ response: 'success', messageSent: data });
    }
    smtpTransport.close();
  });
});