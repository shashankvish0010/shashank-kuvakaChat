import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

// app.use(cors({
//     origin: 'https://wemeet-psi.vercel.app',
//     methods: ['GET', 'POST', 'PUT'],
// }));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

let usersInRoom: string[] = [];

io.on("connection", (socket: Socket) => {
  if (socket.id) {
    usersInRoom.push(socket.id);
    socket.join("room1");
    socket.emit("connected", socket.id);
  }

  socket.on("sendMessages", (messages: string, senderSocketId: string) => {
    if (usersInRoom.length > 1) {
      if (messages && messages.trim() !== "") {
        socket.broadcast.to("room").emit("receiveMessages", messages);
      } else {
        console.log("Received empty message.");
        io.to(senderSocketId).emit(
          "warning",
          `Please send a non-empty message.`
        );
      }
    } else {
      console.log("Only one user in room");
      io.to(senderSocketId).emit(
        "warning",
        `Please wait for other users to join.`
      );
    }
  });

  socket.on("end", () => {
    if (usersInRoom.includes(socket.id)) {
      try {
        usersInRoom = usersInRoom.filter((id) => id != socket.id);
        socket.leave("room1");
        if (usersInRoom.length > 0) {
          socket.broadcast
            .to("room1")
            .emit("warning", `User ${socket.id} left the group.`);
        }
        console.log(`User ${socket.id} left the group.`);
      } catch (error) {
        console.log(`Error while removing user.`);
      }
    } else {
      console.log(`User with id: ${socket.id} not found in room.`);
    }
  });

  socket.on("disconnect", () => {
    usersInRoom = usersInRoom.filter((id) => id !== socket.id);
    if (usersInRoom.length > 0) {
      socket.broadcast
        .to("room1")
        .emit("warning", `User with id: ${socket.id} left the room.`);
    }
    console.log(`User with id: ${socket.id} left the room.`);
  });

  socket.on("error", (error) => {
    console.log(`Socket error: ${error}`);
  });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running up on ${process.env.PORT || 5000}`)
);
