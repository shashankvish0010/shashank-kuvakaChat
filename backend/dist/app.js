"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
// As mentioned task was to complete using net module but as its a TCP server a CLI client was needed to interact also deplyement of the client was not poosible
//I used to build a backend specific chat API with the help of socket server as web client only support to communicate over websockets not TCP socket connections.
//Current project is ready to be used by multiple users in realtime
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//setting up the main I/O for establishing the socket connection over the server
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    },
});
let usersInRoom = new Map(); //Used a Map data structure to store and get user data efficiently and fast compare to an array
io.on("connection", (socket) => {
    //When the home page is loaded it interacts with this part and a socket connecton is establish.
    if (socket.id) {
        usersInRoom.set(socket.id, { name: "", socketId: socket.id }); //Stored socket.id as key to fetch user efficiently
        socket.join("room"); //socket.join is used to push users to join a single room
        socket.emit("connected", socket.id); //Event emitted to send the socket id back to client.
    }
    //It an event which is triggered from the user once it enter and submit the name.
    socket.on("setname", (userName, socketId) => {
        let user = usersInRoom.get(socketId);
        if (user && usersInRoom.size > 1) {
            user.name = userName; //stores the user name within the object in map.
            socket.broadcast
                .to("room")
                .emit("warning", `User ${userName} joined the gorup`);
        }
    });
    // Event created to send messages, while fetchinh username from usersInRoom object efficiently
    socket.on("sendMessages", (messages, senderSocketId) => {
        if (usersInRoom.size > 1) {
            if (messages && messages.trim() !== "") {
                try {
                    let user = usersInRoom.get(senderSocketId);
                    if (user) {
                        socket.broadcast
                            .to("room")
                            .emit("receiveMessages", messages, user.name);
                    }
                }
                catch (error) {
                    console.log(`Error while searching fo user: ${error}`);
                }
            }
            else {
                console.log("Received empty message.");
                io.to(senderSocketId).emit("warning", `Please send a non-empty message.`);
            }
        }
        else {
            console.log("Only one user in room");
            io.to(senderSocketId).emit("warning", `Please wait for other users to join.`);
        }
    });
    //Event to be listened whenever the client end the connection/ closes the tab.
    socket.on("end", () => {
        const user = usersInRoom.get(socket.id);
        if (user) {
            try {
                usersInRoom.delete(socket.id);
                socket.leave("room");
                if (usersInRoom.size > 0) {
                    socket.broadcast
                        .to("room")
                        .emit("warning", `User ${user.name} left the group.`);
                }
                console.log(`User ${user.name} left the group.`);
            }
            catch (error) {
                console.log(`Error while removing user.`);
            }
        }
        else {
            console.log(`User with id: ${socket.id} not found in room.`);
        }
    });
    socket.on("disconnect", () => {
        const user = usersInRoom.get(socket.id);
        if (user) {
            usersInRoom.delete(socket.id);
            if (usersInRoom.size > 0) {
                socket.broadcast
                    .to("room")
                    .emit("warning", `User ${user.name} left the room.`);
            }
            console.log(`User ${user.name} left the room.`);
        }
    });
    //Event to listen for errors related to socket
    socket.on("error", (error) => {
        console.log(`Socket error: ${error}`);
    });
});
//running the server locally at port: 5000 and process.env.PORT is used for deployment.
server.listen(process.env.PORT || 5000, () => console.log(`Server running up on ${process.env.PORT || 5000}`));
