import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatWindow.module.css';
import { v4 as uuidv4 } from 'uuid';
import { getFormattedTime } from '../../utils';

const ChatWindow = ({ username, roomId, socket }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const hasJoinedMessageBeenAdded = useRef(false);
    const [activityMsg, setActivityMsg] = useState("")


    useEffect(() => {
        // Welcome message
        if (!hasJoinedMessageBeenAdded.current) {
            const uuid = uuidv4();
            setMessages(prev => [...prev, {
                id: uuid,
                type: "notif",
                text: `You have joined the room ${roomId}`
            }])
            hasJoinedMessageBeenAdded.current = true;
        }

    }, [roomId])


    useEffect(() => {

        // notifying users that a user has joined

        socket.on("user_join_room", (message) => {
            const uuid = uuidv4();
            setMessages(prev => [...prev, {
                id: uuid,
                type: "notif",
                text: message
            }])
        })

        return () => {
            socket.off("user_join_room");
        }
    }, [socket])


    useEffect(() => {

        //receiving messages from the server

        socket.on("message", ({ username, text, type }) => {
            const uuid = uuidv4();
            setMessages(prevMessages => [...prevMessages, {
                id: uuid,
                username,
                text,
                type
            }])
        })
        return () => {
            socket.off("message");
        };
    }, [socket])

    useEffect(() => {

        // notifying users that the current user left

        const handleBeforeUnload = (event) => {
            socket.emit('user_left_room', { username, roomId });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [username, roomId, socket])

    const handleSendMessage = (e) => {
        e.preventDefault();

        const uuid = uuidv4();

        setMessages(prevMessages => [...prevMessages, {
            id: uuid,
            username,
            text: currentMessage
        }])

        socket.emit("send_message", {
            username,
            roomId,
            text: currentMessage,
        })

        setCurrentMessage("")
    }

    useEffect(() => {
        let timer;

        socket.on("user_typing", (username) => {
            setActivityMsg(`${username} is typing...`);
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = setActivityMsg("");
            }, 2000);
        })

        return () => {
            socket.off("user_typing")
        }
    }, [socket])


    const handleInputChange = (e) => {
        const value = e.target.value;
        setCurrentMessage(value);
        socket.emit("user_typing", { username, roomId });
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h2>Room Name: {roomId}</h2>
                <p>Welcome, <span>{username}</span></p>
            </div>
            <div className={styles.chatMessages}>
                {messages.map((message) => {

                    if (message.type == "notif") {
                        return (
                            <div key={message.id} className={styles.notif}>{message.text}</div>
                        )
                    } else {
                        return (
                            <div
                                key={message.id}
                                className={`${styles.chatMessage} ${message.username === username ? styles.myMessage : styles.otherMessage
                                    }`}
                            >
                                <div className={styles.messageText}>
                                    <span className={styles.messageName}>{message.username}&#x3a;</span>
                                    <span>{message.text}</span>
                                </div>
                                <div className={styles.time}>{getFormattedTime()}</div>
                            </div>
                        )
                    }
                })
                }
                <div className={styles.activityText}>{activityMsg}</div>
            </div>
            <form onSubmit={handleSendMessage} className={styles.messageForm}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={handleInputChange}
                    className={styles.messageInput}
                    required
                />
                <button type="submit" className={styles.sendButton}>Send</button>
            </form>
        </div>
    );
};

export default ChatWindow;