from fastapi import FastAPI 
from Web_Chatbot.backend_aimodels import call_ai_stateless
from Web_Chatbot.backend_aimodels import call_ai_stateful
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import uuid
from dotenv import load_dotenv
import os

load_dotenv()
class stateful_ai_message(BaseModel):
    prompt :str
    session_id : Optional[str] = None

class stateless_ai_message(BaseModel):
    prompt :str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post(os.getenv("STATELESS_POST"))
def send_to_stateless_ai(prompt : stateless_ai_message):
    response = call_ai_stateless(prompt.prompt)
    return { "response" : response}

@app.post(os.getenv("STATEFUL_POST"))
def send_to_stateful_ai(res : stateful_ai_message):

    if res.session_id == None:
        res.session_id = uuid.uuid4().hex[:16]
    response = call_ai_stateful(res.prompt,res.session_id)
    # print(response.get("sessionid"))
    return response


# python -m uvicorn Web_Chatbot.backend_main:app --reload
