function InputChat({ newMessage, setNewMessage, sendMessage }) {
    return (
        <div style={{
            padding: '10px',
            borderTop: '1px solid #ccc',
            backgroundColor: '#fff',
            position: 'sticky',
            bottom: 0
        }}>
            <input
                type="text"
                placeholder="Ketik Sesuatu..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            ></input>
            <button onClick={sendMessage}>Kirim</button>
        </div>
    );
}

export default InputChat;