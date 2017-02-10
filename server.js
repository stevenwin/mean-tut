// load express package to create app
var express = require('express');
var app = express();
var path = require('path');

// send html file to the user
app.get('/', function(req, resp) {
   resp.sendFile(path.join(__dirname + '/index.html'));
});

// create routes for admin section

// get an instance of router
var adminRouter = express.Router();

// route middleware that happens on every request
adminRouter.use(function(req, res, next) {
   // log each request into console
   console.log(req.method, req.url);
   // continue doing what we were doing and go to the route
   next();
})

// admin main page.  the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, resp) {
   resp.send('I am the dashboard')
});

// users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, resp) {
   resp.send('I show all users')
});

// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, resp) {
   resp.send('I show all the posts')
})

// route middleware to validate :name
adminRouter.param('name', function(req, resp, next, name) {
   // do validation on name here
   // blah blah validation
   // log something so we know it's working
   console.log('doing name validations on '+name)

   // once validation is done, save new item in the req
   req.name = name

   // go to next thing
   next();
});

// route with parameters (https://localhost:1337/admin/hello/:name)
adminRouter.get('/hello/:name', function(req, resp) {
   console.log('hello '+req.name+'!')
   resp.send('hello '+req.name)
})

// route with parameters (http://localhost:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req, resp) {
   resp.send('hello '+req.params.name+'!')
})

// apply the routes to our application
app.use('/admin', adminRouter);

app.route('/login')
   // show the login form (GET http://localhost:1337/login)
   .get(function(req, resp) {
      resp.send('this is the login form')
   })

   //process the form (POST http://localhost:1337/login)
   .post(function(req, resp) {
      console.log('processing')
      resp.send('processing the login form!')
   })


// start the server
app.listen(1337);
console.log('1337 is the magic port')