// const net = require("node:net");
// const readline = require("node:readline");

// // Create a readline interface for user input
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let clientName = null;

// // Connect to the chat server
// const client = net.createConnection({ port: 8080 }, () => {
//   console.log("Connected to the chat server!");
//   // Prompt the user to enter their name
//   rl.question("Please enter your full name: ", (name) => {
//     clientName = name.trim();
//     if (clientName) {
//       console.log(`Welcome, ${clientName}! You can now start chatting.`);
//       client.write(`You can now chat with ${clientName}.`);
//       promptMessage(); // Start chat after entering the name
//     } else {
//       console.log("Name cannot be empty. Exiting...");
//       client.end();
//       process.exit(0);
//     }
//   });
// });

// // Handle incoming messages from the server
// client.on("data", (data) => {
//   console.log(`\n${data.toString().trim()}`);
//   promptMessage(); // Prompt the user again after receiving a message
// });

// // Handle connection errors
// client.on("error", (error) => {
//   console.error(`Connection error: ${error.message}`);
//   process.exit(1);
// });

// client.on("end", () => {
//   console.error(`Disconnecting from chat server`);
//   rl.close();
//   process.exit(0);
// });

// // Prompt the user for a chat message
// const promptMessage = () => {
//   rl.question(`${clientName}: `, (message) => {
//     if (!message) {
//       console.log("Empty message cannot be sent.");
//       return;
//     }
//     if (message.trim()) {
//       client.write(`${clientName}: ${message}`);
//       promptMessage();
//     }
//   });
// };

// // Handle client disconnection
// process.on("SIGINT", () => {
//   console.log("\nDisconnecting from chat server...");
//   client.end();
//   rl.close();
//   process.exit(0);
// });
