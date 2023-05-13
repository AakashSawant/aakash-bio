var express = require('express');
var path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const port = 5000;                  //Save the port number where your server will be listening

var app = express();

app.use('/assets',express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//for /index page
app.get('/', function(request,response){
	response.sendFile('index.html',{root:path.join(__dirname,'./views')});
});

app.post('/send-inquiry', (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sawantaakash71@gmail.com',
      pass: 'gcuwmdkbnrkwegty'
    },
  });

  const mailOptions = {
    from: 'sawantaakash71@gmail.com',
    to: 'sawantaakash71@gmail.com',
    subject: `${subject} - Inquiry from ${name}`,
    html: `
      <p>Name: ${name}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Subject: ${subject}</p>
      <p>Message: ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send(`
        <h2>Oops! Something went wrong.</h2>
        <p>We're sorry, but there was an error sending your inquiry. Please try again later.</p>
      `);
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send(`
        <h2>Thank you for your inquiry!</h2>
        <p>We have received your message and will get back to you shortly.</p>
      `);
    }
  });
});


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});