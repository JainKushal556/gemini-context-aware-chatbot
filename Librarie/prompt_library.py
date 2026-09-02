def explain_topic(topic):
    return f"""
    Explain the following programming topic:
    Topic: {topic}
    Include:
    1. A simple definition
    2. Why it is used
    3. How it works
    4. One practical example
    5. One common mistake
    Keep the explanation beginner-friendly.
    """

def review_code(code):
    return f"""
    Review the following Python code:
    {code}
    Identify:
    1. Errors or bugs
    2. Bad practices
    3. Possible improvements
    For every issue, explain why it is a problem.
    Do not rewrite the entire code unless necessary.
    """

def summarize_text(text):
    return f"""
    Summarize the following text:
    {text}
    Requirements:
    - Keep the summary concise.
    - Include only important information.
    - Return the key points as bullet points.
    - Do not add information that is not present in the text.
    """

def generate_interview_question(topic, difficulty="beginner"):
    return f"""
    Generate one {difficulty}-level technical interview question
    about {topic}.
    Do not provide the answer.
    Return only one question.
    """

# It Can Be Used In Rag Systems .
def answer_from_context(context, question):
    return f"""
    Context:
    {context}
    Question:
    {question}
    Answer the question using only the provided context.
    If the answer cannot be found in the context, say:
    "I don't know based on the provided context."
    Do not make up information.
    """
