import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const host = "https://be-mongodb.onrender.com";

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(""); // User ID từ backend
    const [users, setUsers] = useState([]); // Danh sách user online
    const [receiverId, setReceiverId] = useState(""); // ID của người nhận

    const socketRef = useRef();

    useEffect(() => {
        // Kết nối socket
        socketRef.current = socketIOClient.connect(host, {
            withCredentials: true, // Cho phép gửi cookie (HttpOnly)
        });

        // Nhận userId từ server sau khi kết nối
        socketRef.current.on("connect", () => {
            console.log("Connected to server:", socketRef.current.id);
        });

        // Cập nhật danh sách user online
        socketRef.current.on("updateUserList", (userList) => {
            console.log("Online Users:", userList);
            setUsers(userList);
        });

        // Nhận tin nhắn riêng tư
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
            setMessages((prev) => [...prev, { from: userId, message }]); // Hiển thị tin nhắn của mình
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="user-list">
                <h3>Online Users</h3>
                <ul>
                    {users.map((id) => (
                        <li key={id} onClick={() => setReceiverId(id)}>
                            {id} {receiverId === id && "(Selected)"}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chat-box">
                {messages.map((m, index) => (
                    <div key={index} className={m.from === userId ? "my-message" : "other-message"}>
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

export default App;
