
var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
httpServer.listen(8080);
     


function requestHandler (req, res) {
	fs.readFile(__dirname + '/background.html',

		function(err, data) {

			if (err) { 
			res.writeHead(500);
			return res.end('error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		}
	
	);

}


var io = require('socket.io').listen(httpServer);
var users = new Array();

io.set('log level',1);




io.sockets.on('connection', function (socket) {

	console.log("We have a new worker: " +socket.id);



		socket.on ('set button', function (data) {
			     console.log(data);

			     var newUser = true;

			     for (var i=0; i<users.length; i++){
			     	var u = users[i];
			     	if(data.id == u.id)  {
			     		u.id = data.id;
			     		u.button = data.button;
			     		u.cnt += 1;
			     		users[i] = u;
			     		newUser = false;
			     		break;
					}
			     }
					if(newUser) {
						var user = {};
						user.id = data.button;
						user.cnt = 1;
						users.push(users);
					}

					console.log('users', users);

		// socket.set('button', Working, function () {
		// 		socket.emit('ready');
		// });
		});


	// socket.on('msg', function(){
	// 	socket.get('button', function (err, socketButton) {
	// 				console.log('workerData by ', socketButton);
	// 	});


			socket.on('disconnect', function () {
					socket.broadcast.emit('disconnect', socket.id);

					var index = -1;

					for(var i=0; i<users.length; i++) {
						if(users[i].id == socket.id)
							index = i;
					}
					if(index != -1) {
						users.splice(index,1);
					}


			});


	}

);



