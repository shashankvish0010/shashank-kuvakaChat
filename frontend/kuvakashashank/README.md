## Kuvaka - Chat App

This is a real-time chat server and client application built using Node.js and Socket.IO. The app supports multiple users communicating in a shared chatroom in real-time. Here's everything you need to know about the project, including how it works and how to run it.

- NET module could be used to build the server, but as it build a TCP socket connection, it would lead to setup the client `CLI` locally, which is not the best case to deliver, that's the reason I used socket.io.

## Project Features

# Backend (Server):

- Handles multiple client connections simultaneously.
- Uses WebSocket connections for real-time communication.
- Broadcasts messages from one user to all other users in the chatroom (except the sender).
- Notifies users when someone joins or leaves the chatroom.

# Frontend (Client):

- Allows users to:
- Connect to the chatroom.
- Set their name.
- Send and receive messages in real-time in a group chat while showing respective usernames.

## How It Works

- The server uses Socket.IO to manage WebSocket connections.
- Users are added to a shared chatroom when they connect.
- Messages sent by a user are broadcasted to all other users.
- User data (name and socket ID) is stored in a Map for fast and efficient lookup.

## Why This Design?

- Concurrency: The server can handle multiple users at the same time, thanks to the asynchronous nature of Node.js and Socket.IO.
- Efficiency: A Map is used to store user information, ensuring quick access when users join, send messages, or leave.
- Real-Time Communication: WebSockets allow for instant updates between the server and clients.
  Assumptions and Choices
- Socket.IO was used because modern web browsers support WebSocket connections but not direct TCP sockets.
- A single shared room ("room") was used to keep all users in the same chat environment.

The frontend was built using React + Vite for scalability and ease of use.

## Access the application

# Deployment: Live Application Link:

- Frontend / Client Link: https://shashank-kuvaka-chat.vercel.app/

- Server Link: https://shashank-kuvakachat.onrender.com

## How to Run the Project

Prerequisites
Make sure you have the following installed:

Node.js (v14 or later)
npm

Steps to run the project locally:

1. Run the Backend
   Clone the repository:
   git clone : https://github.com/shashankvish0010/shashank-kuvakaChat.git
   cd backend

Install the required dependencies:

- npm install
  Start the server:
- npm run start (will start the server)
  By default, the server will run at http://localhost:5000.

2. Run the Frontend
   Navigate to the frontend folder:

- cd frontend
- cd kuvakashashank

Install dependencies:

- npm install
- Change the socket server url from the production url to http://localhost:5000 at src/contexts/ChatContext.tsx

Start the frontend:
npm start

Open your browser and go to http://localhost:5173 to access the chat application.

## Error Handling

- Users are warned if they try to send empty messages.
- If only one user is in the room, they are prompted to wait for others to join.
- The server cleans up user data when someone disconnects.
