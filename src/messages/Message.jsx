function Message({ isSender, message }) {
    return (
        <div className={isSender ? "right" : 'left'}>
            <h1 style={{ color: isSender ? "blue" : "red" }}>{message}</h1>
        </div >
    );
}

export default Message;