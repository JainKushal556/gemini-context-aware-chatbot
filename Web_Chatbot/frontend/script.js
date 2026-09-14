const chatBox    = document.getElementById("chat-box");
const userInput  = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const botStatus  = document.getElementById("bot-status");

// ─── Backend URL Constants ─────────────────────────────────────────────────────
const URL_STATEFUL   = "https://gemini-context-aware-chatbot.onrender.com/stateful_ai";   // AI with memory
const URL_STATELESS  = "https://gemini-context-aware-chatbot.onrender.com/stateless_ai";  // AI without memory
const URL_HEALTH     = "https://gemini-context-aware-chatbot.onrender.com/health";        // Health check

let session_id = null
// Tracks which mode is currently selected ("stateful" or "stateless")
let currentMode = "stateless";



// ─── Mode Toggle ───────────────────────────────────────────────────────────────
function setMode(mode) {
    if (currentMode === mode) return; // Already in this mode

    currentMode = mode;
    session_id = null; // Reset session memory

    // Update button active state
    document.getElementById("btn-stateful").classList.toggle("active", mode === "stateful");
    document.getElementById("btn-stateless").classList.toggle("active", mode === "stateless");

    // Clear previous chat messages
    chatBox.innerHTML = "";

    // Show fresh welcome message according to the mode
    if (mode === "stateful") {
        addMessage("Switched to Memory Mode 🧠 (I will remember our conversation). How can I help?", "bot");
    } else {
        addMessage("Switched to No Memory Mode ⚡ (Fresh chat each time). How can I help?", "bot");
    }
}


// ─── Helper: Add a message to the chat ────────────────────────────────────────
function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    
    if (sender === "bot" && typeof marked !== "undefined") {
        bubble.innerHTML = marked.parse(text);
    } else {
        bubble.textContent = text;
    }

    msgDiv.appendChild(bubble);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}


// ─── Helper: Show / Hide typing indicator ─────────────────────────────────────
function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.id = "typing-indicator";

    typingDiv.innerHTML = `
        <div class="typing-bubble">
            <span></span><span></span><span></span>
        </div>`;

    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) indicator.remove();
}


// ─── Main: Send message and call the backend ──────────────────────────────────
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display the user's message
    addMessage(message, "user");
    userInput.value = "";
    sendButton.disabled = true;
    showTyping();

    try {
        // Use the URL based on the selected mode
        // const BACKEND_URL = currentMode === "stateful" ? URL_STATEFUL : URL_STATELESS;

        let res;
        if(currentMode === "stateful")
        {
            const BACKEND_URL = URL_STATEFUL
            res = await fetch(BACKEND_URL, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                prompt : message,
                session_id : session_id
            }
            )
        });
        }
        else{
            const BACKEND_URL = URL_STATELESS
            res = await fetch(BACKEND_URL, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                prompt : message
            }
            )
        });
        }
        
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        
        if (data.sessionid) {
            session_id = data.sessionid;
        }

        hideTyping();
        addMessage(data.response, "bot");

    } catch (error) {
        hideTyping();
        addMessage("Something went wrong. Please try again.", "bot");
        console.error("Error:", error);
    } finally {
        sendButton.disabled = false;
        userInput.focus();
    }
}


// ─── Backend Status Checker ───────────────────────────────────────────────────
async function checkBackendStatus() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 sec timeout

        const res = await fetch(URL_HEALTH, {
            method: "GET",
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
            if (botStatus) {
                botStatus.textContent = "Online";
                botStatus.classList.remove("offline");
            }
        } else {
            if (botStatus) {
                botStatus.textContent = "Offline";
                botStatus.classList.add("offline");
            }
        }
    } catch (err) {
        if (botStatus) {
            botStatus.textContent = "Offline";
            botStatus.classList.add("offline");
        }
    }
}

// ─── Events ───────────────────────────────────────────────────────────────────
sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
});


// ─── Welcome message & status check on page load ──────────────────────────────
window.addEventListener("load", function () {
    addMessage("Hi! I'm Kimi, Kushal's chatbot. How can I help you today?", "bot");
    checkBackendStatus();
    setInterval(checkBackendStatus, 5000); // Check every 5 seconds
});

