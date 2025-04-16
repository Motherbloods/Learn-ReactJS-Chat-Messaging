import { useState, useRef, useEffect, useMemo } from "react";
import Message from "./Message";
import InputChat from "./component/InputChat";
import HeaderChat from "./component/HeaderChat";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { users, conversations, messagesData } from "./dummy/Messaging";

function Messages() {

    const [currentUser, setCurrentUser] = useLocalStorageState('_id', 'u1')
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
        // Reset search-related states when changing conversation
        setSearchValue('');
        setMatchedIndexes([]);
        setSearchResultCount(0);
        setCurrentMatchIndex(0);
        // Set the new conversation
        setCurrentConversation(conversationId);
    };

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
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, []);

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
                <div style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Cari pesan..."
                        value={searchValue}
                        style={{ width: '70%', padding: '8px' }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        style={{ padding: '8px 12px', marginLeft: '10px' }}
                    >
                        Cari
                    </button>
                    {searchValue && searchResultCount > 0 && (
                        <div className="search-navigation" style={{ marginTop: '10px' }}>
                            <p style={{ fontStyle: 'italic' }}>
                                Found {searchResultCount} messages containing "<strong>{searchValue}</strong>"
                            </p>
                            <div className="navigation-buttons">
                                <button
                                    onClick={handlePrevious}
                                    style={{ marginRight: '10px' }}
                                    aria-label="Previous result"
                                >
                                    ⬅️ Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    aria-label="Next result"
                                >
                                    Next ➡️
                                </button>
                            </div>
                            <p className="search-status" style={{ fontSize: '12px', marginTop: '5px' }}>
                                {searchResultsLabel}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
                    {conversations
                        .filter(cvn => cvn.participants.includes(currentUser)) // Hanya tampilkan percakapan yang melibatkan currentUser
                        .map((cvn, idx) => {
                            // Temukan user lain yang ikut dalam percakapan selain currentUser
                            const otherUserId = cvn.participants.find((id) => id !== currentUser);
                            const otherUser = users.find((user) => user._id === otherUserId);
                            // kalau mau fungsi langsung dirender pakai {nama fungsi} kalau mau ketika diklik saja pakai {()=>nama fungsi}
                            return (
                                <div key={idx} style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }} onClick={() => handleConversationChange(cvn._id)}>
                                    <div>
                                        <img
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}
                                            src={otherUser?.avatar || "https://images.unsplash.com/photo-1741851373451-59e7260fe72c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                            alt={otherUser?.name}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{otherUser?.name || "Unknown User"}</div>
                                    </div>
                                </div>
                            );
                        })}
                </div>


                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {currentConversation ? <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        {filteredMessages.map((message, index) => {

                            return (
                                <div key={index} ref={(el) => messageRefs.current[message.originalIndex] = el}>
                                    <Message
                                        key={index}
                                        message={
                                            typeof message.text === 'string'
                                                ? highlightText(message.text, searchValue)
                                                : message.text // untuk gambar tetap tampil normal
                                        }
                                        isSender={message.senderId === currentUser}
                                    />
                                </div>)
                        })}
                        <div ref={bottomRef} />
                    </div> : <div style={{ display: 'flex', alignContent: 'center' }}>Mulai Chat</div>}
                </div>
            </div>
            <InputChat newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
        </div >
    );

}
export default Messages;
