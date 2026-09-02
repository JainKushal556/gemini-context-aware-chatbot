# 🤖 Context-Aware AI Chatbot (CLI to Web UI)

An end-to-end AI Chatbot powered by **Google Gemini AI** and **FastAPI**, featuring multi-turn conversation memory and a modular system prompt library. Built as **Progress Update #3** of my **Custom RAG Development Journey**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **LLM Engine** | Google Gemini (`google-genai` SDK) |
| **Backend** | FastAPI + Pydantic (UUID Session Management, CORS) |
| **Frontend** | Vanilla JavaScript (Async/Await Fetch API) + Modern HTML/CSS |
| **CLI Prototype** | Python Terminal Loop with Interactive Context Tracking |

---

## 🛠️ Key Features

- **Stateful Conversation Flow:** Uses Gemini's interaction tracking (`previous_interaction_id`) linked with session IDs in FastAPI to retain context across multi-turn chats without heavy external frameworks.
- **Modular Prompt Library (`Librarie/`):**
  - `python_tutor()` — Explains programming topics in simple beginner-friendly terms.
  - `code_reviewer()` — Analyzes code for bugs and improvements.
  - `document_qna()` — Strictly answers questions based on provided context (designed for upcoming RAG integration).
  - `summarizer()` & `interviewer()` — Specialized task prompts.
- **Two-Phase Architecture:**
  - `Terminal_Chatbot/` — Interactive CLI prototype to test raw API calls & memory.
  - `Web_Chatbot/` — Production-style REST API and responsive chat interface.

---

## 💻 Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/JainKushal556/gemini-context-aware-chatbot.git
cd gemini-context-aware-chatbot
```

### 2. Set up virtual environment
```bash
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Setup `.env` file
Create a `.env` file in the root directory:
```env
API_KEY=your_gemini_api_key_here
STATELESS_POST=/chat/stateless
STATEFUL_POST=/chat/stateful
```

### 5. Run the Project

* **Option A: Run Terminal Chatbot (CLI)**
  ```bash
  python -m Terminal_Chatbot.terminal_main
  ```

* **Option B: Run Web Chatbot (FastAPI + Web UI)**
  ```bash
  python -m uvicorn Web_Chatbot.backend_main:app --reload
  ```
  Open `Web_Chatbot/frontend/index.html` in your browser!

---

## 🔗 Related & Next Steps

- 📄 Part of my [RAG Development Journey](https://github.com/JainKushal556)
- 📌 **Next Milestone:** PDF Ingestion, Text Chunking, and Vector Database integration (PostgreSQL + pgvector).
