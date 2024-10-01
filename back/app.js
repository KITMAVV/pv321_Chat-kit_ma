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
    // Створити імя
        oneUserSocket.name = oneUserSocket.id;

        const newUser = {
            name: oneUserSocket.name,
            connectedAt: Date.now()
        }

    // Сообщить всем - что кто то открыл страницу
    allSocketServer.emit('new_user_connection',newUser )


    // Обработка сообщения от клиента - его пересылка всем, кто подключен
    oneUserSocket.on('new_message', (data) => {

        const msg = {
            name: oneUserSocket.name,
            msg: data,
            createdAt: Date.now()
        }

        allSocketServer.emit('new_message', msg);
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