import Message from "./Message";
function ChatBody({ filteredMessages, messageRefs, highlightText, searchValue, currentUser, bottomRef }) {
    return (
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
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
        </div >
    );
}

export default ChatBody;