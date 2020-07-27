var express = require('express');
var app = express();
var fs = require("fs");

app.get('/getUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data)
    });
});

app.get('/getUsers/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    })
})

app.delete('/delUser/:index', function(req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err, data){
        data = JSON.parse(data)
        delete data["user" + req.params.index]
        res.end(JSON.stringify(data))
    })
})

var user = {
    "user4" : {
        "name" : "D",
        "id" : 4
    }
}

app.post('/addUser', function(req, res) {
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data))
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s", host, port);

})