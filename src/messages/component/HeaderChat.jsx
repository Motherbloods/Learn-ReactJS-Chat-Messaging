function HeaderChat({ currentUser, toggleUser }) {
    return (<div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <p>Current User = {currentUser}</p>
        <button onClick={toggleUser}>Ganti User</button>
    </div>);
}

export default HeaderChat;