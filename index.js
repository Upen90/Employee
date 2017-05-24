var express = require('express');
var app = express();
var con = require('./mysqlpool');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// This responds with "Hello World" on the homepage
app.get('/getUser/:id', function (req, res) {
   console.log("Got a GET request for the homepage");
   console.log(req.params.id);
   con.query("select * from employee where id="+req.params.id+";", function (err, result) {
    if (err) throw err;
     res.send(result);
  });
 
})

app.get('/', function (req, res) {
   console.log("This is to load the homepage");
   console.log(req.params.id);
  
})

// This responds a POST request for the homepage
app.get('/saveUser/:name/:salary', function (req, res) {
   console.log("Got a POST request for the homepage");
   console.log("name"+req.params.name+"Salary"+req.params.salary);
   var id;
    con.query("select max(id)+1 as id from employee;", function (err, result) {
    if (err) throw err;
    id=result;
    var sql="insert into employee values ("+Number(result[0].id)+",'"+req.params.name+"' , "+req.params.salary+" );";
    console.log(sql);
    con.query(sql, function (errn, result) {
    if (errn) throw errn;
    res.send(id);
  });
  
});


})

app.put('/saveUser',urlencodedParser, function (req, res) {
   console.log("Got a POST request for the homepage");
   console.log(req.body);
   console.log("name"+req.body.name+"Salary"+req.body.salary);
    var id;
    con.query("select max(id)+1 as id from employee;", function (err, result) {
    if (err) throw err;
     id=result;
     var sql="insert into employee values ("+Number(result[0].id)+",'"+req.body.name+"' , "+req.body.salary+" );";
     console.log(sql);
     con.query(sql, function (errn, result) {
     if (errn) throw errn;
     res.send(id);
  });
  
});


})

app.post('/updateUser',urlencodedParser, function (req, res) {
   console.log("Got a POST request for the homepage");
   console.log(req.body);
   console.log("id"+req.body.name+"name"+req.body.name+"Salary"+req.body.salary);
    var id;
    con.query("update employee set userName='"+req.body.name+"', salary="+req.body.salary+" where id = "+req.body.id, function (err, result) {
    if (err) throw err
     res.send(result);

  
});


})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user',urlencodedParser, function (req, res) {
   console.log("Got a DELETE request for /del_user");
   console.log("ID to delete"+ req.body.id);
   con.query("delete from employee where id="+req.body.id+" ; ",function(err,result){
 if(err) throw err
 res.send(JSON.stringify(req.body.id));
   });

})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   con.query("select * from employee;", function(err,result){
    if (err) throw err;
    res.send(result);
   });
})

app.get('/getOneuser', function (req, res) {
   console.log("Got a GET request for /getOneuser");
   console.log("My ID is " + req.query.id);
   con.query("select * from employee where id="+req.query.id+";", function(err,result){
    if (err) throw err;
    res.send(result);
   });
})


var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})