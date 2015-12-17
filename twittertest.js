var Twitter = require('twitter');
var http = require('http');
var port = process.env.PORT || 1337;

var client = new Twitter({
    consumer_key: 'UcTeeFPdoyDIj5rv34GafFz9V',
    consumer_secret: '01fcek9ycgwC8NFkOB6ZBW3ziT4ogNMbPEgGCpDUcIDLGcvCYR',
    access_token_key: '45614826-OqRDBEhLxVwm5Dg7V7UzvE25QS3XZGIWjZUeo6vu4',
    access_token_secret: 'pvlIm6K3aJw3KsC3U1TTrsQvjDBDVUb3Eb1Z7D6wsFOuM'
});

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'  });
    //search for 10 tweets containing lolcats

    var url = require('url');
    var queryData = url.parse(request.url, true).query;
    var search = queryData.q;

    client.get('search/tweets', {q: search , count: '10'}, function(error, tweets){
        console.log(search);
        var json = [];
        for (var i =0; i< tweets.statuses.length ; i++)
        {
            json.push({name: tweets.statuses[i].user.name, text: tweets.statuses[i].text});
        }

        response.end(JSON.stringify(json));
    });
}).listen(port);
