import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import './Message.css';
import { getMessage } from '../../services/api.js'

const host = "https://be-mongodb.onrender.com";

function Message() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(""); // Lưu userId của người dùng hiện tại
    const [users, setUsers] = useState([]); // Danh sách user online
    const [receiverId, setReceiverId] = useState("");
    const [messageList, setMessageList] = useState([]);

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
    }, []); // Chạy lại khi userId thay đổi

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

    const chooseRecevierId = async (id) => {
        setReceiverId(id);
        let res = await getMessage(id);
        if (res) {
            console.log(res)
            setMessageList(res.message)
        } else {
            console.log('lỗi message')
        }

    }

    return (
        <div className="chat-container">
            <div className="user-list">
                <h3>Online Users</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} onClick={() => chooseRecevierId(user.id)} className={receiverId === user.id ? "selected" : ""}>
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
                {messageList.map((m, index) => (
                    <div key={index} className={`message ${m.userId === userId ? "my-message" : "other-message"}`}>
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
