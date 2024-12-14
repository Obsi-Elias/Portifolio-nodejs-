require('dotenv').config();  // used to hide the .env file of email and password
const express = require('express');
const nodemailer = require('nodemailer'); // used to send gmail 
const path = require('path');               // used to define the path of directory
const {engine} = require('express-handlebars');  // To handle dynamic html file with express.js
const bodyParser = require('body-parser');  // body-parser is a Node.js library that parses incoming HTTP request bodies and makes them available as objects in the req.body property


const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user:  process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});



app.use(express.static(path.join(__dirname, "public")));

// body parser to parse the json file
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));  // defining the path of the views directory
app.engine(".hbs", engine ({   // configuring the engine when rendering it with extension name and layout 
    extname: ".hbs",
    defaultLayout: false
}));
app.set("view engine", ".hbs");   // Sets the template engine to use .hbs files.  This ensures Express automatically renders .hbs files without needing to specify the engine in every route.

app.get('/', (request, response) => {
    response.render("home.hbs",{title: 'Hello, Handlebars'});
});

app.get('/work', (request,response) => {
    response.render("work.hbs");
});

app.get('/contact', (request, response) => {
    response.render("contact.hbs");
});


app.get('/contact', (request, response, next) => {

    response.render("contact",{submitted: "yes"});
});

app.post('/contact', (request, response, next) => {
    // console.log(request.body); 

    // steps to send the mail to our gmail 
    // step 1
    const name = request.body.fullname;
    const email = request.body.email;
    const subject = request.body.subject;
    const note = request.body.note;
    // step 2 
    const mailOptions = {
        from: "obsielias2019@gmail.com",
        to: "obsielias2019@gmail.com",
        subject: subject,
        text: note,
        html: "<b> Full Name </b>" + name + "<br><b> Email </b>" + email + "<br><b> note </b>" + note
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log("Error while sending email");
            response.send("Failed to send email");
        }  
        else {
            console.log("Email sent");
            response.render("contact",{submitted: "yes"});
        }
    });
});


const port = 3000;
app.listen(port, console.log(`Listening on port ${port}`));