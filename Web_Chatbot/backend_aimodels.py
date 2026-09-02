from google import genai
from dotenv import load_dotenv
import os
import Librarie.prompt_library as pl
import Librarie.system_instruction_library as sl
load_dotenv()

sessions = {}
client = genai.Client(api_key=os.getenv("API_KEY"))
model_name = "gemini-3.5-flash-lite"


# It Keeps Track Of Previous Chats 
def call_ai_stateful(prompt,session_id):
    global sessions
    previous_id = sessions.get(session_id)
    global model_name
    # prompt = pl.explain_topic(prompt)
    systemInstruction = "You are Kushal's Created First Chatbot. Your name is Kimi"
    if previous_id is None:
        try:
            response1 =client.interactions.create(
                model=model_name,
                input=prompt,
                generation_config={
                    "temperature" : 1.0
                },
                system_instruction=systemInstruction
            )
        except Exception as e:
            return {"Error": str(e)}
        else:
            sessions[session_id]=response1.id
            # previous_id = response1.id
            return {"sessionid" : session_id , "response" : response1.output_text}
        
    else:
        try:
            response2 = client.interactions.create(
                model=model_name,
                input=prompt,
                generation_config={
                    "temperature" : 1.0
                },
                system_instruction=systemInstruction,          
                previous_interaction_id= previous_id
            )
        except Exception as e:
            return {"Error": str(e)}
        else:
            sessions[session_id]=response2.id
            # previous_id = response2.id
            return {"sessionid" : session_id , "response" : response2.output_text}

# No History Used By This Ai 
def call_ai_stateless(prompt):
    systemInstruction = "You are Kushal's Created First Chatbot. Your name is Kimi"
    try:
        response = client.interactions.create(
            model=model_name,
            input=prompt,
            generation_config={
                "temperature" : 1.0
            },
            system_instruction=systemInstruction
        )
    except Exception as e:
        return {"Error": str(e)}
    else:
        return response.output_text
