//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//and our HTTP server
var http = require('http');
//setup our port
var port = process.env.PORT || 1337;


// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://LukeM94:lmorton-16@ds054288.mongolab.com:54288/mongo';

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Connecting \n');
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        response.write('Connection Made \n');
        if (err) {
            response.write('Unable to connect to the mongoDB server. Error:' + err + "\n");
        } else {
            //HURRAY!! We are connected. :)
            response.write('Connection established to' + url +"\n");
            // Get the documents collection
            var collection = db.collection('users');

            //We have a cursor now with our find criteria
            var results = collection.find({age: {$lte:30}});
            //var results = collection.find({name: 'modulus user'});


            //Lets iterate on the result
            results.each(function (err, result) {
                if (err) {
                    response.write(err);
                } else {
                    response.write('Fetched: ' + result.name + " : " + result.age + " : " + result.roles.toString() +'\n');
                }
                if (result == null) {
                    response.end('Completed');
                    db.close();
                }
            });

        }
    });

}).listen(port);