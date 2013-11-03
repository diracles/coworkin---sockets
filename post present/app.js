var app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs');

app.listen(8080);




function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('error loading index.html');
			}


				res.writeHead(200);
				res.end(data);
			});
		}



var users = new Array();


//"on" is an event listener which is a method of "io", io is a pathway which a bunch of sockets, 
//sockets must be an object that references all the connections (mult sockets)
//io is a main thing you can use to emit to everyone
io.sockets.on('connection', function(socket){

//pulling out singular socket


			// var newUser = true;

			// 	for (var i=0; i<users.length; i++){
			// 		var u = users[i];
			// 		if (socket.id == u.id) {
			// 			newUser = false;
			// 			break;

			// 		}
			// 	}

			// 		if(newUser) {

			// 			//catching the user object from client
			// 			//creating an empty array item which represents each socket connection
			// 			var user = { };
			// 			user.id = socket.id;
			// 			user.Name = null;
			// 			user.currentTime = 0;
			// 			users.push(user);

			// 		}



					
	socket.on('update time', function(data){

				var newUser = true;

				for (var i=0; i<users.length; i++){	
				console.log(socket.id + " " + users[i].id);			
					if (socket.id == users[i].id) {
						console.log("they are equal");
						//pulling data out to safety into index pulled from for loop
						users[i].id = socket.id;
						users[i].Name = data.Name;
						users[i].currentTime = data.currentTime;
						newUser = false;
					} else {
						console.log("not equal");
					}


				}

					if(newUser) {

						//catching the user object from client
						//creating an empty array item which represents each socket connection
						var user = { };
						user.id = socket.id;
						user.Name = data.Name;
						user.currentTime = data.currentTime;
						users.push(user);

					}

			// for (var i=0; i<users.length; i++) {

			// 	if (data.id == users[i].id) {
			// 		//pulling data out to safety into index pulled from for loop
			// 		users[i].id = data.id;
			// 		users[i].Name = data.Name;
			// 		users[i].currentTime = data.currentTime;

			// 	}

			// }

			io.sockets.emit('update clients', users);

		console.log(data);
	});


	socket.on('disconnect', function () {
		console.log("I'm IN DISCONNECTTTTTTTTTTTTTTTTTTTTTT");
		for (var i=0; i<users.length; i++) {
			if (socket.id == users[i].id) {

				var removedUser = users[i].splice(i, 1);
				console.log("I'm in disconnect " + removedUser);
			}
		}
	});

		
});