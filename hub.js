var io = require('socket.io').listen(8082);

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
});
