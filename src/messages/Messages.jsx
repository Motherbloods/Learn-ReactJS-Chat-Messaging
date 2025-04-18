import InputChat from "./component/InputChat";
import HeaderChat from "./component/HeaderChat";
import { users, conversationsData, messagesData } from "./dummy/Messaging";
import ConversationSideBar from "./component/ConversationSidebar";
import ChatBody from "./component/ChatBody";
import MessageSearch from "./component/MessageSearch";
import useMessaging from "./hooks/useMessaging";
import useSearchingMessages from "./hooks/useSearchMessages";
import { useState } from "react";

function Messages() {

    const { currentUser,
        toggleUser,
        conversations,
        onAddConversation,
        handleConversationChange,
        currentConversation,
        messages, setMessages,
        filteredMessages,
        bottomRef, } = useMessaging(conversationsData, messagesData)

    const { searchValue,
        setSearchValue,
        handleSearch,
        handleNext,
        handlePrevious,
        searchResultsLabel,
        searchResultCount,
        messageRefs } = useSearchingMessages(messages, currentConversation)
    const [newMessage, setNewMessage] = useState("");

    //Untuk menambahkan Pesan baru ke const messages
    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        let content = newMessage.trim();

        const conversation = conversations.find(
            (cvn) => cvn._id === currentConversation
        );
        const receiverId = conversation.participants.find(
            (id) => id !== currentUser
        );

        const newMsgObj = {
            _id: `m${messages.length + 1}`,
            senderId: currentUser,
            conversationId: currentConversation,
            text: content,
            receiverId: receiverId,
            createdAt: new Date(),
        };

        setMessages((prevMsg) => [...prevMsg, newMsgObj]);
        setNewMessage('')
    };
    const highlightText = (text, keyword) => {
        if (!keyword) return text;

        const parts = text.split(new RegExp(`(${keyword})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <mark
                    key={index}
                    style={{ backgroundColor: "#fff176", padding: "0 2px" }}
                >
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div>
                <HeaderChat currentUser={currentUser} toggleUser={toggleUser} allUsers={users} />
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
