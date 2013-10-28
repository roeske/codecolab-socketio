var io = require('socket.io').listen(8080);

var clients = {};

io.sockets.on('connection', function(socket) {
    socket.emit("ready", {});

    socket.on('observe_project', function(data) {
        if (!clients.hasOwnProperty(data['project_id'])) {
            clients[data['project_id']] = [];
        }
        clients[data['project_id']].push(socket.id);
    });

    socket.on('reorder_cards', function(data) {
        console.log("REORDER_CARDS:" + JSON.stringify(data));
        for (c in clients[data['project_id']]) {
            var socket_id = clients[data['project_id']][c];
            io.sockets.socket(socket_id).emit('reorder_cards', data);
        }
    });

    socket.on('reorder_piles', function(data) {
        console.log("REORDER_PILES:" + JSON.stringify(data));
        for (c in clients[data['project_id']]) {
            var socket_id = clients[data['project_id']][c];
            io.sockets.socket(socket_id).emit('reorder_piles', data);
        }
    });

    socket.on('add_card', function(data) {
        console.log("ADD_CARD:" + JSON.stringify(data));
        for (c in clients[data['project_id']]) {
            var socket_id = clients[data['project_id']][c];
	    if (socket_id === socket.id) {
		continue;
	    }
            io.sockets.socket(socket_id).emit('add_card', data);
        }
    });


    socket.on('archive_card', function(data) {
        console.log("archive_card:" + JSON.stringify(data));
        for (c in clients[data['project_id']]) {
            var socket_id = clients[data['project_id']][c];
	    if (socket_id === socket.id) {
		continue;
	    }
            io.sockets.socket(socket_id).emit('archive_card', data);
        }
    });


    socket.on('add_pile', function(data) {
        console.log("add_pile!");
	console.log(data['project_id']);

        for (c in clients[data['project_id']]) {
            var socket_id = clients[data['project_id']][c];
	    if (socket_id === socket.id) {
		continue;
	    }
            io.sockets.socket(socket_id).emit('add_pile', data);
        }
    });


    socket.on('delete_pile', function(data) {
        console.log("delete_pile:" + JSON.stringify(data));
        for (c in clients[data['project_id']]) {
            var socket_id = clients[data['project_id']][c];
	    if (socket_id === socket.id) {
		continue;
	    }
            io.sockets.socket(socket_id).emit('delete_pile', data);
        }
    });
});
