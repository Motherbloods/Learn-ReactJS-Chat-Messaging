function ConversationSideBar({ conversations, currentUser, users, onSelectedConversation, onAddConversation }) {
    return (
        <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
                <h3 style={{ margin: 0 }}>Chats</h3>
                <div>
                    <h4>Start New Chat</h4>
                    {users
                        .filter(user => user._id !== currentUser) // Jangan tampilkan diri sendiri
                        .map(user => (
                            <button
                                key={user._id}
                                onClick={() => onAddConversation(user._id)}
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    padding: '6px 12px',
                                    cursor: 'pointer'
                                }}
                            >
                                Chat with {user.name}
                            </button>
                        ))}
                </div>

            </div>
            <div>
                {conversations
                    .filter(cvn => cvn.participants.includes(currentUser)) // Hanya tampilkan percakapan yang melibatkan currentUser
                    .map((cvn, idx) => {
                        // Temukan user lain yang ikut dalam percakapan selain currentUser
                        const otherUserId = cvn.participants.find((id) => id !== currentUser);
                        const otherUser = users.find((user) => user._id === otherUserId);
                        // kalau mau fungsi langsung dirender pakai {nama fungsi} kalau mau ketika diklik saja pakai {()=>nama fungsi}
                        return (
                            <div key={idx} style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }} onClick={() => onSelectedConversation(cvn._id)}>
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
        </div>
    );
}

export default ConversationSideBar; 