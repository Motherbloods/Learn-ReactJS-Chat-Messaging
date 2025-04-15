import { createRoot } from "react-dom/client";
import Messages from "./Messages";
import { StrictMode } from "react";
import './Message.css';

createRoot(document.getElementById("root")).render(<StrictMode><Messages /></StrictMode>);
