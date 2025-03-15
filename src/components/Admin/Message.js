import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import './Message.css';

const host = "https://be-mongodb.onrender.com";

function Message() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(""); // Lưu userId của người dùng hiện tại
    const [users, setUsers] = useState([]); // Danh sách user online
    const [receiverId, setReceiverId] = useState(""); // ID người nhận

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host, {
            withCredentials: true, // Cho phép gửi cookie
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to server:", socketRef.current.id);
        });

        // Nhận userId từ server
        socketRef.current.on("authenticated", (id) => {
            console.log("Authenticated as:", id);
            setUserId(id);
        });

        socketRef.current.on("updateUserList", (userList) => {
            console.log("Online Users:", userList);
            setUsers(userList.filter(user => user.id !== userId)); // Lọc bỏ user hiện tại
        });

        socketRef.current.on("privateMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [userId]); // Chạy lại khi userId thay đổi

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
