var app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs');

app.listen(80);


function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
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


			var newUser = true;

				for (var i=0; i<users.length; i++){
					var u = users[i];
					if (socket.id == u.id) {
						newUser = false;
						break;

					}
				}

					if(newUser) {

						//catching the user object from client
						//creating an empty array item which represents each socket connection
						var user = { };
						user.id = socket.id;
						user.Name = null;
						user.currentTime = 0;
						users.push(user);

					}


					
	socket.on('update time', function(data){

			for (var i=0; i<users.length; i++) {

				if (data.id == users[i].id) {
					//pulling data out to safety into index pulled from for loop
					users[i].id = data.id;
					users[i].Name = data.Name;
					users[i].currentTime = data.currentTime;

				}

			}

			socket.emit('update clients', { users: users });

		console.log(data);
	});


	socket.on('disonnect', function ()) {
		for (var i=0; i<users.length; i++) {
			if (socket.id == users[i].id) {

				users.splice(i, 1);

			}
		}
	}

		
});