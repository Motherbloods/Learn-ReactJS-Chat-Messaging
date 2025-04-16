import { useState, useRef, useEffect, useMemo } from "react";
import Message from "./component/Message";
import InputChat from "./component/InputChat";
import HeaderChat from "./component/HeaderChat";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { users, conversationsData, messagesData } from "./dummy/Messaging";
import ConversationSideBar from "./component/ConversationSidebar";
import ChatBody from "./component/ChatBody";
import MessageSearch from "./component/MessageSearch";

function Messages() {

    const [currentUser, setCurrentUser] = useLocalStorageState('_id', 'u1')
    const [conversations, setConversations] = useLocalStorageState('conversations-chat', conversationsData)
    const [currentConversation, setCurrentConversation] = useState(null)
    // const [searchValue, setSearchValue] = useState['']
    const [searchValue, setSearchValue] = useState('')
    const [newMessage, setNewMessage] = useState("");
    const [searchResultCount, setSearchResultCount] = useState(0);
    const [matchedIndexes, setMatchedIndexes] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [messages, setMessages] = useLocalStorageState('chat-messages', messagesData)

    // Agar ketika mengirim pesan baru langsung scroll tambahkan div dengan ref bottomRef
    const bottomRef = useRef(null);
    const messageRefs = useRef([])

    // Untuk merubah Current User
    const toggleUser = () => {
        setCurrentUser((prev) => (prev === "u1" ? "u2" : "u1"));
    };

    const handleConversationChange = (conversationId) => {
        console.log('ini handle')
        // Reset search-related states when changing conversation
        setSearchValue('');
        setMatchedIndexes([]);
        setSearchResultCount(0);
        setCurrentMatchIndex(0);
        // Set the new conversation
        setCurrentConversation(conversationId);
    };

    const onAddConversation = (receiverId) => {
        if (receiverId === currentUser) return

        const existingConversation = conversations.find(c =>
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
        setConversations((prev) => [...prev, newConversation])
        setCurrentConversation(newConversation._id);
    }

    //Untuk menambahkan Pesan baru ke const messages
    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        let content = newMessage.trim();

        const conversation = conversations.find(cvn => cvn._id === currentConversation)
        const receiverId = conversation.participants.find(id => id !== currentUser)

        const newMsgObj = {
            _id: `m${messages.length + 1}`,
            senderId: currentUser,
            conversationId: currentConversation,
            text: content,
            receiverId: receiverId,
            createdAt: new Date()

        };

        setMessages((prevMsg) => [...prevMsg, newMsgObj]);
        setNewMessage("");
    };

    const filteredMessages = useMemo(() => {
        if (!currentConversation) return []
        const messagesFilter = messages.map((msg, idx) => ({ ...msg, originalIndex: idx })).filter(msg => msg.conversationId === currentConversation).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        console.log(currentConversation)
        return messagesFilter;
    }, [currentConversation, messages])

    const handleSearch = () => {
        if (!searchValue.trim()) return;

        const lowerSearch = searchValue.toLowerCase();

        const matches = messages
            .map((message, index) => {
                if (message.conversationId === currentConversation && message.text.toLowerCase().includes(lowerSearch)) { return index }
                return null;
            })
            .filter(index => index !== null);

        if (matches.length > 0) {
            setMatchedIndexes(matches);
            setCurrentMatchIndex(0);
            setSearchResultCount(matches.length);
            // messageRefs.current[matches[0]]?.scrollIntoView({ behavior: "smooth", block: "center" });
            scrollToMatch(0)
        } else {
            setMatchedIndexes([]);
            setCurrentMatchIndex(0);
            setSearchResultCount(0);
            alert("Pesan tidak ditemukan.");
        }
    };

    const highlightText = (text, keyword) => {
        if (!keyword) return text;

        const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <mark key={index} style={{ backgroundColor: '#fff176', padding: '0 2px' }}>
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    const handleNext = () => {
        if (matchedIndexes.length === 0) return;
        const nextIndex = (currentMatchIndex + 1) % matchedIndexes.length;
        setCurrentMatchIndex(nextIndex);
        // messageRefs.current[matchedIndexes[nextIndex]]?.scrollIntoView({ behavior: "smooth", block: "center" });
        scrollToMatch(matchedIndexes[nextIndex])
    };

    const handlePrevious = () => {
        if (matchedIndexes.length === 0) return;
        const prevIndex = (currentMatchIndex - 1 + matchedIndexes.length) % matchedIndexes.length;
        setCurrentMatchIndex(prevIndex);
        // messageRefs.current[matchedIndexes[prevIndex]]?.scrollIntoView({ behavior: "smooth", block: "center" });
        scrollToMatch(matchedIndexes[prevIndex])
    };

    const searchResultsLabel = useMemo(() => {
        if (!searchValue || searchResultCount === 0) return "";
        return `Showing result ${currentMatchIndex + 1} of ${searchResultCount}`;
    }, [searchValue, searchResultCount, currentMatchIndex]);


    const scrollToMatch = (index) => {
        messageRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

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
        setSearchValue('');
        setMatchedIndexes([])
        setSearchResultCount(0)
        setCurrentConversation(null)
    }, [currentUser]);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>

                <HeaderChat currentUser={currentUser} toggleUser={toggleUser} allUsers={users} />

                {/* Input Pencarian */}
                <MessageSearch searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} searchResultCount={searchResultCount} handlePrevious={handlePrevious} handleNext={handleNext} searchResultsLabel={searchResultsLabel} />
            </div>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <ConversationSideBar conversations={conversations} currentUser={currentUser} users={users} onSelectedConversation={handleConversationChange} onAddConversation={onAddConversation} />
                <ChatBody filteredMessages={filteredMessages} messageRefs={messageRefs} highlightText={highlightText} searchValue={searchValue} currentUser={currentUser} bottomRef={bottomRef} />
            </div>
            <InputChat newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
        </div >
    );

}
export default Messages;
