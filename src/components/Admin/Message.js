import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { getProfile } from "../../services/api";

const socket = io("https://be-mongodb.onrender.com", { withCredentials: true });

const Message = () => {
    const [receiverId, setReceiverId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("");
    const showProfile = async () => {
        try {
            let user = await getProfile();

            if (!user || user.status === false) {
                window.location.href = `${window.location.origin}/login`;
                return; // Dừng thực thi tiếp
            }

            setUser(user);
        } catch (error) {
            console.error("Lỗi khi lấy hồ sơ người dùng:", error);
            window.location.href = `${window.location.origin}/login`;
        }
    };
    useEffect(() => {
        socket.emit("authenticate"); // Server tự lấy token từ Cookie

        socket.on("private message", ({ from, message }) => {
            setMessages((prev) => [...prev, { from, text: message, type: "received" }]);
        });
        showProfile();
        return () => {
            socket.off("private message");
        };
    }, []);

    const sendMessage = () => {
        if (receiverId && message) {
            socket.emit("private message", { to: receiverId, message });
            setMessages((prev) => [...prev, { from: "You", text: message, type: "sent" }]);
            setMessage("");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">Chat App</h2>

            <div className="mb-4">
                <p>ID: {user._id}</p>
                <label className="block text-sm font-medium">Recipient ID</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter recipient ID..."
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Message</label>
                <textarea
                    className="w-full px-3 py-2 border rounded-lg"
                    rows="3"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={sendMessage}
            >
                Send Message
            </button>

            <div className="mt-6 bg-white p-4 rounded-lg shadow-inner h-60 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2">Messages</h3>
                <ul className="space-y-2">
                    {messages.map((msg, index) => (
                        <li
                            key={index}
                            className={`p-2 rounded-lg text-sm ${msg.type === "sent" ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-black text-left"}`}
                        >
                            <strong>{msg.from}:</strong> {msg.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}



export default Message;