const socket = new WebSocket("ws://localhost:3001");

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (message) {
    socket.send(message);
    addMessage(`🧑 You: ${message}`);
    input.value = '';
    }
}

function addMessage(text) {
    const messagesDiv = document.getElementById('messages');
    const msg = document.createElement('div');
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}