function HeaderChat({ currentUser, toggleUser, allUsers }) {
    const currentUserData = allUsers.find((usr) => usr._id === currentUser);

    // Then extract the name from the user object, with a fallback
    const userName = currentUserData ? currentUserData.name : 'Unknown';

    return (<div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <p>Current User = {currentUser}</p>
        <p>{userName}</p>
        <button onClick={toggleUser}>Ganti User</button>
    </div>);
}

export default HeaderChat;