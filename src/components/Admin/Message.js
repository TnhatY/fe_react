import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import './Message.css';
const host = "https://be-mongodb.onrender.com";

function Message() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(""); // User ID từ backend
    const [users, setUsers] = useState([]); // Danh sách user online
    const [receiverId, setReceiverId] = useState(""); // ID của người nhận

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host, {
            withCredentials: true, // Cho phép gửi cookie (HttpOnly)
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to server:", socketRef.current.id);
        });

        socketRef.current.on("updateUserList", (userList) => {
            console.log("Online Users:", userList);
            setUsers(userList);
        });

        socketRef.current.on("privateMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "" && receiverId !== "") {
            socketRef.current.emit("privateMessage", {
                to: receiverId,
                message,
            });
            setMessages((prev) => [...prev, { from: userId, message }]);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="user-list">
                <h3>Online Users</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} onClick={() => setReceiverId(user.id)} className={receiverId === user.id ? "selected" : ""}>
                            <img src={user.avatar} alt="avatar" className="user-avatar" />
                            <span>{user.lastName}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chat-box">
                {messages.map((m, index) => (
                    <div key={index} className={`message ${m.from === userId ? "my-message" : "other-message"}`}>
                        {m.message}
                    </div>
                ))}
            </div>

            <div className="send-box">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập tin nhắn ..." />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Message;
