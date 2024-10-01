/**
 * Create socket server
 */
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const allSocketServer =
    new Server(httpServer, {
    cors: {
        origin: "*"
    }
});


// Обработка подключения клиента
allSocketServer.on("connection",
    (oneUserSocket) => {
    console.log(`User connected: ${oneUserSocket.id}`);

    // Сообщить всем - что кто то открыл страницу
    allSocketServer.emit('new_user_connection', {socket_id: oneUserSocket.id})

    // Обработка сообщения от клиента - его пересылка всем, кто подключен
    oneUserSocket.on('new_message', (data) => {
        allSocketServer.emit('new_message', data);
    })

    // Обработка отключения клиента
    oneUserSocket.on("disconnect", () => {
        console.log(`User disconnected: ${oneUserSocket.id}`);
    });
});

/**
 * Run socket server
 */
httpServer.listen(3030, () => {
    console.log("Socket server is running on http://localhost:3030");
});