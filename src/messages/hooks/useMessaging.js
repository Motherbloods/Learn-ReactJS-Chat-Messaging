import { useState, useEffect, useMemo, useRef } from "react";
import useLocalStorageState from "./useLocalStorageState"; // asumsinya kamu punya ini

function useMessaging(conversationsData, messagesData) {
  const [currentUser, setCurrentUser] = useLocalStorageState("_id", "u1");
  const [conversations, setConversations] = useLocalStorageState(
    "conversations-chat",
    conversationsData
  );
  const [messages, setMessages] = useLocalStorageState(
    "chat-messages",
    messagesData
  );
  const [currentConversation, setCurrentConversation] = useState(null);

  // Agar ketika mengirim pesan baru langsung scroll tambahkan div dengan ref bottomRef
  const bottomRef = useRef(null);
  const messageRefs = useRef([]);

  // Untuk merubah Current User
  const toggleUser = () => {
    setCurrentUser((prev) => (prev === "u1" ? "u2" : "u1"));
  };

  const handleConversationChange = (conversationId) => {
    setCurrentConversation(conversationId);
  };

  const onAddConversation = (receiverId) => {
    if (receiverId === currentUser) return;

    const existingConversation = conversations.find(
      (c) =>
        c.participants.includes(currentUser) &&
        c.participants.includes(receiverId)
    );

    if (existingConversation) {
      // Kalau sudah ada, langsung buka percakapan tersebut
      setCurrentConversation(existingConversation._id);
      return;
    }

    const newConversation = {
      _id: `c${Date.now()}`,
      participants: [currentUser, receiverId],
      lastMessage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [...prev, newConversation]);
    setCurrentConversation(newConversation._id);
  };

  const filteredMessages = useMemo(() => {
    if (!currentConversation) return [];
    const messagesFilter = messages
      .map((msg, idx) => ({ ...msg, originalIndex: idx }))
      .filter((msg) => msg.conversationId === currentConversation)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    console.log(currentConversation);
    return messagesFilter;
  }, [currentConversation, messages]);
  // Dipanggil setiap messages berubah/bertambah(ketika user mengirim pesan ditandai [messages])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // Kalau ini dipanggil ketika pertama kali dibuka ditandai dengan []
  useEffect(() => {
    if (currentConversation) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [currentConversation]);

  useEffect(() => {
    setCurrentConversation(null);
  }, [currentUser]);

  return {
    currentUser,
    messageRefs,
    toggleUser,
    conversations,
    onAddConversation,
    handleConversationChange,
    currentConversation,
    messages,
    setMessages,
    filteredMessages,
    bottomRef,
  };
}

export default useMessaging;
