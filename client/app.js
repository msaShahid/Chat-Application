const socket = io("ws://localhost:3001"); 

// socket.on('connect', () => {
//     addMessage('✅ Connected to server');
// });

socket.on('message', (data) => {
    addMessage(`📨 Server: ${data}`);
});

// socket.on('disconnect', () => {
//     addMessage('❌ Disconnected from server');
// });

// socket.on('connect_error', (error) => {
//     console.error('Connection error:', error);
// });

const input = document.getElementById('messageInput');
const typingIndicator = document.getElementById('typingIndicator');

function sendMessage() {
    const message = input.value.trim();
    if (message) {
        socket.emit('message', message); // Use a named event
       // addMessage(`🧑 You: ${message}`);
        input.value = '';
    }
    typingIndicator.textContent = "";
}

function addMessage(text) {
    const messagesDiv = document.getElementById('messages');
    const msg = document.createElement('div');
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

input.addEventListener('keypress', () => {
    // activity event
    socket.emit('activity', socket.id.substring(0, 5));
})

let activityTimer;

socket.on("activity", (name) =>{
    typingIndicator.textContent = `${name} is typing...`

    // clear after 3 second
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() =>{
        typingIndicator.textContent = "";
    }, 3000)
})
