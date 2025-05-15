import styles from './ChatWindow.module.css';
import { useState } from 'react';


const ChatWindow = ({username, roomId, socket}) => {
   
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [activityMsg, setActivityMsg] = useState("")

    return (
        <div className={styles.chatContainer}>
           <div className={styles.chatHeader}>
                <h2>Room Name: {roomId}</h2>
                <p>Welcome, <span>{username}</span></p>
            </div>
            <div className={styles.chatMessages}>
                {messages.map(message => {
                    const {id, text, type, username} = message || {};
                    
                    if(type === "notif"){
                        return <div key={id} className={styles.notif}>{text}</div>
                    } else {
                        return (
                            <p>{username}</p>
                        )
                    }

                })}
            </div>
        </div>
    );
};

export default ChatWindow;