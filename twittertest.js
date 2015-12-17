var Twitter = require('twitter');
var http = require('http');
var port = process.env.PORT || 1337;

var client = new Twitter({
    consumer_key: 'V9C6Aok8Tcr1aFzhEzfJRDAfE',
    consumer_secret: '28N666lpWr2xLYYrdTdSm4ZHnQ1vp96SL0pD8WkhkggVAbFgNw',
    access_token_key: '45614826-gtsSrBU9jPngkeI0RKFv5h40eJOMTUMukZ86GOZ1k',
    access_token_secret: 'Z0qhznuqPVSTEEuZiARBTh7sCv1EXm0NXAG6acbVzKAH1'
});

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'  });
    //search for 10 tweets containing lolcats

    var url = require('url');
    var queryData = url.parse(request.url, true).query;
    var search = queryData.q;

    console.log(queryData.q);

    client.get('search/tweets', {q: search , count: '10'}, function(error, tweets){
        var json = [];
        for (var i =0; i< tweets.statuses.length ; i++)
        {
            json.push({name: tweets.statuses[i].user.name, text: tweets.statuses[i].text});
        }

        response.end(JSON.stringify(json));
    });
}).listen(port);
