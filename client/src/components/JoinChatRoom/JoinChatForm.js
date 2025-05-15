import React, { useState } from 'react';
import styles from './JoinChatForm.module.css';

const JoinChatForm = ({ onJoin, username, setUsername, roomId, setRoomId }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(username, roomId)
        onJoin({
            username,
            roomId
        })
    }

    return (
        <div className={styles.joinChatContainer}>
            <h1 className={styles.heading}>Join a Room to Chat</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter a room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>Join Room Now</button>
            </form>
        </div>
    );
};

export default JoinChatForm;