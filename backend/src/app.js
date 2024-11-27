const net = require("node:net");

let clients = [];

const server = net.createServer((socket) => {
  console.log(
    `New client connected: ${socket.remoteAddress}:${socket.remotePort}`
  );

  try {
    if (socket instanceof net.Socket) {
      clients.push(socket);
    }
  } catch (error) {
    console.log(`Error while adding client: ${error.message}`);
  }

  // Set encoding for incoming messages
  socket.setEncoding("utf-8");

  // Handle incoming data
  socket.on("data", (data) => {
    const message = data.trim();

    if (!message) {
      console.log("Received an empty message. Ignoring.");
      return; // Ignore empty messages
    }

    try {
      // Broadcast message to all other clients
      if (clients.length > 1) {
        clients.forEach((client) => {
          if (client !== socket) {
            try {
              client.write(`${message}\n`);
            } catch (error) {
              console.log(
                `Error sending message to a client: ${error.message}`
              );
            }
          }
        });
      } else {
        // Notify sender that they are the only user
        socket.write(
          "You are the only user in the chatroom. Wait for others to join.\n"
        );
      }
    } catch (error) {
      console.log(`Error while broadcasting message: ${error.message}`);
    }
  });

  // Handle client disconnection
  socket.on("end", () => {
    console.log(
      `Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`
    );
    clients = clients.filter((client) => client !== socket); // Remove disconnected client
  });

  // Handle socket errors
  socket.on("error", (error) => {
    console.log(`Socket error: ${error.message}`);
    clients = clients.filter((client) => client !== socket); // Clean up after error
  });

  // Handle unexpected input that may crash the server
  socket.on("close", () => {
    console.log(`Socket closed: ${socket.remoteAddress}:${socket.remotePort}`);
    clients = clients.filter((client) => client !== socket); // Clean up on close
  });
});

// Start the server
server.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 8080");
});

// Handle server errors
server.on("error", (error) => {
  console.log(`Server error: ${error.message}`);
});
