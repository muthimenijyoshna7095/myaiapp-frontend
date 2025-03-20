const express = require("express");
const Message = require("./messageModel");

const router = express.Router();

// ✅ Function for bot response
function getBotResponse(userMessage) {
    if (!userMessage) return "I'm here to chat! Ask me anything.";
    
    const message = userMessage.toLowerCase();
    if (message.includes("hello") || message.includes("hi")) return "Hello! How are you?";
    if (message.includes("fine")) return "Let's rock the day, bro!";
    if (message.includes("how are you")) return "I'm just a bot, but I'm doing great! What about you?";
    if (message.includes("joke")) return "Why don’t skeletons fight each other? Because they don’t have the guts!";
    if (message.includes("your name")) return "I'm ChatBot, your AI assistant!";
    if (message.includes("thanks")) return "You're welcome! If you have any more questions, just ask.";
    if (message.includes("bye")) return "Goodbye! Have a great day!";
    return "I'm still learning! Can you ask me something else?";
}

// ✅ Fetch all messages from MongoDB
router.get("/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Handle user message and send bot response
router.post("/messages", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Message cannot be empty" });

        // ✅ Save user message
        const userMessage = new Message({ sender: "User", text });
        await userMessage.save();

        // ✅ Generate and save bot response
        const botResponseText = getBotResponse(text);
        const botMessage = new Message({ sender: "Bot", text: botResponseText });
        await botMessage.save();

        // ✅ Send both user and bot messages as response
        res.json([userMessage, botMessage]);
    } catch (error) {
        console.error("Error saving messages:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
