const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');  // To handle dynamic html file with express.js

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));  // defining the path of the views directory
app.engine(".hbs", engine ({   // configuring the engine when rendering it with extension name and layout 
    extname: ".hbs",
    defaultLayout: false
}));
app.set("view engine", ".hbs");   // Sets the template engine to use .hbs files.  This ensures Express automatically renders .hbs files without needing to specify the engine in every route.

app.get('/', (request, response) => {
    response.render("home.hbs",{title: 'Hello, Handlebars'});
})

app.get('/work', (request,response) => {
    response.render("work.hbs");
})

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}`));