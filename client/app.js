const socket = new WebSocket("ws://localhost:3001");

socket.addEventListener('open', () => {
    addMessage('✅ Connected to server');
});

socket.addEventListener('message', (event) => {
    addMessage(`📨 Server: ${event.data}`);
});

socket.addEventListener('close', () => {
    addMessage('❌ Disconnected from server');
});

socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});

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