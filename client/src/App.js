import { io } from 'socket.io-client';
import JoinChatForm from './components/JoinChatRoom/JoinChatForm';
import { useEffect, useState } from 'react';
import ChatWindow from './components/ChatWindow/ChatWindow';

// connection initialized
const socket = io("http://localhost:3001");

function App() {

  const [isInRoom, setIsInRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Socket connection has been extablished")
    })

    return () => {
      socket.off("connect");
    }
  },[])

  const handleJoinRoom = () => {

    // Adding user to the room
    socket.emit('user_join_room', { username, roomId });

    // toggling the user to go chat window page
    setIsInRoom(true);
  }

  return (
    <div>
      {isInRoom ?  
        <ChatWindow 
        username={username}
        roomId={roomId}
        socket={socket}
        /> : 
        <JoinChatForm 
          onJoin={handleJoinRoom}
          setUsername={setUsername}
          setRoomId={setRoomId}
          username={username}
          roomId={roomId}

        />  
      }
    </div>
  );
}

export default App;
