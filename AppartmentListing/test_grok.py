import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ["LLM_API_KEY"],
    base_url="https://api.groq.com/openai/v1",
)

try:
    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        max_tokens=50,
        messages=[{"role": "user", "content": "Reply with exactly: OK"}],
    )
    print("SUCCESS:", completion.choices[0].message.content)
except Exception as e:
    print("FAILED:", type(e).__name__)
    print(e)
