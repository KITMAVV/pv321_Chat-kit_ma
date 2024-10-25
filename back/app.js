import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const allSocketServer = new Server(httpServer, {
    cors: { origin: "*" }
});

allSocketServer.on("connection", (oneUserSocket) => {
    console.log(`User connected: ${oneUserSocket.id}`);
    oneUserSocket.name = oneUserSocket.id;

    const newUser = {
        userId: oneUserSocket.id,
        name: oneUserSocket.name,
        connectedAt: Date.now()
    };

    allSocketServer.emit('new_user_connection', newUser);

    oneUserSocket.on('new_message_group', (data) => {
        const msg = {
            userId: oneUserSocket.id,
            name: oneUserSocket.name,
            msg: data.msg,
            createdAt: Date.now()
        };

        switch (data.groupName) {
            case 'car':
                allSocketServer.emit('new_message_car', msg);
                break;
            case 'it':
                allSocketServer.emit('new_message_it', msg);
                break;
            default:
                allSocketServer.emit('new_message', msg);
        }

        allSocketServer.emit('new_message', msg);
    });

    oneUserSocket.on('new_name_user', (data) => {
        const oldNameUser = oneUserSocket.name;
        const newNameUser = data;

        oneUserSocket.name = newNameUser;

        const msg = {
            userId: oneUserSocket.id,
            oldNameUser: oldNameUser,
            newNameUser: newNameUser,
            createdAt: Date.now()
        };

        allSocketServer.emit('new_name_user', msg);
    });

    oneUserSocket.on('new_message', (data) => {
        const msg = {
            userId: oneUserSocket.id,
            name: oneUserSocket.name,
            msg: data,
            createdAt: Date.now()
        };

        allSocketServer.emit('new_message', msg);
    });

    oneUserSocket.on('new_message_cars', (data) => {
        const msg = {
            userId: oneUserSocket.id,
            name: oneUserSocket.name,
            msg: data,
            createdAt: Date.now()
        };

        allSocketServer.emit('new_message_cars', msg);
    });

    oneUserSocket.on('new_message_it', (data) => {
        const msg = {
            userId: oneUserSocket.id,
            name: oneUserSocket.name,
            msg: data,
            createdAt: Date.now()
        };

        allSocketServer.emit('new_message_it', msg);
    });

    oneUserSocket.on("disconnect", () => {
        console.log(`User disconnected: ${oneUserSocket.id}`);
    });

    oneUserSocket.on('ping', (data) => {
        console.log('--> ping from user ' + oneUserSocket.name + ' ' + data);
    });
});

setInterval(() => {
    let d = Date.now();
    console.log('ping users -->: ' + d);
    allSocketServer.emit('ping', d);
}, 5000);

httpServer.listen(3030, () => {
    console.log("Socket server is running on http://localhost:3030");
});
