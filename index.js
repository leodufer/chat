var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)
app.set('port', (process.env.PORT || 5000));
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket) {
	console.log('a user connected');

	socket.on('chat message', function(msg){
		 io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
});

http.listen(app.get('port'),function() {
	console.log('listening on '+app.get('port'));
})