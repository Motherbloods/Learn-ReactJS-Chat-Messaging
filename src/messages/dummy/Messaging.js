export const users = [
  { _id: "u1", name: "Alice" },
  { _id: "u2", name: "Bob" },
  { _id: "u3", name: "Charlie" },
  { _id: "u4", name: "Reza" },
];

export const conversationsData = [
  {
    _id: "c1",
    participants: ["u1", "u2"],
    lastMessage: "m3",
    createdAt: new Date("2024-04-01T10:00:00Z"),
    updatedAt: new Date("2024-04-01T10:10:00Z"),
  },
  {
    _id: "c2",
    participants: ["u1", "u3"],
    lastMessage: "m6",
    createdAt: new Date("2024-04-01T11:00:00Z"),
    updatedAt: new Date("2024-04-01T11:10:00Z"),
  },
  {
    _id: "c3",
    participants: ["u2", "u3"],
    lastMessage: "m9",
    createdAt: new Date("2024-04-01T12:00:00Z"),
    updatedAt: new Date("2024-04-01T12:15:00Z"),
  },
];

export const messagesData = [
  {
    _id: "m1",
    conversationId: "c1",
    senderId: "u1",
    text: "Hey Bob!",
    receiverId: "u2",
    createdAt: new Date("2024-04-01T10:01:00Z"),
  },
  {
    _id: "m2",
    conversationId: "c1",
    senderId: "u2",
    text: "Hi Alice!",
    receiverId: "u1",
    createdAt: new Date("2024-04-01T10:02:00Z"),
  },
  {
    _id: "m3",
    conversationId: "c1",
    senderId: "u1",
    text: "How are you?",
    receiverId: "u2",
    createdAt: new Date("2024-04-01T10:10:00Z"),
  },

  {
    _id: "m4",
    conversationId: "c2",
    senderId: "u3",
    text: "Hi Alice!",
    receiverId: "u1",
    createdAt: new Date("2024-04-01T11:01:00Z"),
  },
  {
    _id: "m5",
    conversationId: "c2",
    senderId: "u1",
    text: "Hey Charlie!",
    receiverId: "u3",
    createdAt: new Date("2024-04-01T11:05:00Z"),
  },
  {
    _id: "m6",
    conversationId: "c2",
    senderId: "u3",
    text: "Wanna catch up later?",
    receiverId: "u1",
    createdAt: new Date("2024-04-01T11:10:00Z"),
  },

  {
    _id: "m7",
    conversationId: "c3",
    senderId: "u2",
    text: "Charlie, are you free today?",
    receiverId: "u3",
    createdAt: new Date("2024-04-01T12:05:00Z"),
  },
  {
    _id: "m8",
    conversationId: "c3",
    senderId: "u3",
    text: "Yes, after 6 PM!",
    receiverId: ["u2"],
    createdAt: new Date("2024-04-01T12:10:00Z"),
  },
  {
    _id: "m9",
    conversationId: "c3",
    senderId: "u2",
    text: "Cool, let's meet at the café.",
    receiverId: "u3",
    createdAt: new Date("2024-04-01T12:15:00Z"),
  },
];
