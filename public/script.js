const socket = io("http://localhost:6969");
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

if (messageForm != null) {
  let name = prompt("What is your name?");
  appendMessage("You joined");
  socket.emit("new-user", rName, name);

  messageForm.addEventListener("submit", a => {
    a.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", rName, message);
    messageInput.value = "";
  });
}

socket.on("chat-message", data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-disconnected", name => {
  appendMessage(`${name} disconnected`);
});

socket.on("user-connected", name => {
  appendMessage(`${name} connected`);
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
socket.on("room-created", room => {
  const roomElement = document.createElement("div");
  roomElement.innerText = room;
  const roomLink = document.createElement("a");
  roomLink.href = `/${room}`;
  roomLink.innerText = "join";
  roomContainer.append(roomElement);
  roomContianer.append(roomLink);
});
