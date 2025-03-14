import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://be-mongodb.onrender.com", { withCredentials: true });

const Message = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("authenticate"); // Server tự lấy token từ Cookie

        socket.on("private message", ({ from, message }) => {
            setMessages((prev) => [...prev, `From ${from}: ${message}`]);
        });

        return () => {
            socket.off("private message");
        };
    }, []);

    const register = async () => {
        await axios.post("https://be-mongodb.onrender.com/register", { email, password });
        alert("Registered successfully!");
    };

    const login = async () => {
        await axios.post("https://be-mongodb.onrender.com/login",
            { email, password },
            { withCredentials: true } // Gửi & nhận Cookie
        );
        alert("Logged in successfully!");
    };

    const sendMessage = () => {
        if (receiver && message) {
            socket.emit("private message", { to: receiver, message });
            setMessages((prev) => [...prev, `To ${receiver}: ${message}`]);
            setMessage("");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
            <h2>Chat App</h2>

            {!email ? (
                <>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </>
            ) : (
                <>
                    <h3>Welcome, {email}</h3>
                    <input type="text" placeholder="Recipient" onChange={(e) => setReceiver(e.target.value)} />
                    <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>

                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Message;
