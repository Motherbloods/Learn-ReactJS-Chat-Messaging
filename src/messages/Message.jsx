function Message({ isSender, message, }) {
    const isImage = typeof message === 'object' && message.type === 'image';

    return (
        <div className={isSender ? "right" : 'left'}>
            {isImage ? (<img
                src={message.src}
                alt="Sent"
                style={{
                    maxWidth: '200px', borderRadius: '8px'
                }}
            />) : (<h1 style={{ color: isSender ? "blue" : "red" }}>{message}</h1>)
            }
        </div >
    );
}

export default Message;