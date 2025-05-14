const socket = io("ws://localhost:3001"); 

socket.on('connect', () => {
    addMessage('✅ Connected to server');
});

socket.on('message', (data) => {
    addMessage(`📨 Server: ${data}`);
});

socket.on('disconnect', () => {
    addMessage('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (message) {
        socket.emit('message', message); // Use a named event
       // addMessage(`🧑 You: ${message}`);
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

