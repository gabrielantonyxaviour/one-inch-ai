from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import re

# Initialize FastAPI
app = FastAPI()

# Ensure the Groq API key is set in your environment
os.environ['GROQ_API_KEY'] = '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'
client = Groq(api_key=os.environ['GROQ_API_KEY'])

# Initialize an in-memory chat history
chat_history = []

# Define a request model for POST requests
class UserMessage(BaseModel):
    message: str

# Define a response model
class ResponseModel(BaseModel):
    action: str
    params: str
    response: str

@app.post("/process_message", response_model=ResponseModel)
async def process_message(user_message: UserMessage):
    global chat_history

    # Extract the message content from the request
    user_message_text = user_message.message

    # Add the user's message to the chat history
    chat_history.append({"role": "user", "content": user_message_text})

    # Prepare message payload for Groq with chat history and specific instructions
    messages = [
        {
            "role": "system",
            "content": """1.) You are an expert in DeFi who answers users queries.
2.) You will be providing 3 outputs to me in this format {
    "action": "",
    "params": "",
    "response": ""
}
3.) The response should hold the response you generate
4.) The params and action should be empty until the user asks you to swap or check balance
5.) If the user asks to swap, then enter the action as swap
5.) If the user asks to check balance enter the action as balance
6.) If the user wants to swap, ask questions like what coin they want to swap, the coin which is gonna be replaced, the amount of coins, the network and the slippage. NOTE: Users can choose slippage between 0.1 and 5, by default it has to be 0.1
7.) If the user wants to check balance ask questions like what coin and the network
8.) For swap, once you've asked all questions the param value should be like this <chain>_<token_in>_<token_out>_<slippage>_<amount>
9.) For balance, once you've asked all questions the param value should be like this <chain>_<token>.
10.) The chain, token_in, token_out should all be in their abbreviations and NEVER mention the whole name
IMPORTANT: Your response should be like this in this format Eg. \n\n{\n\n    \"action\": \"\",\n    \"params\": \"\",\n    \"response\": \"DeFi is a set of financial services and systems that operate on blockchain technology, providing an open, transparent, and accessible way to manage financial assets.\"\n\n}"" it should properly extract the action, param, and the response."""

        }
    ]

    # Include the chat history in the messages sent to Groq
    messages.extend(chat_history)

    # Get the response from Groq
    completion = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=messages,
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
    )

    # Correctly access the response content
    groq_response = completion.choices[0].message.content.strip()

    # Add the assistant's response to the chat history
    chat_history.append({"role": "assistant", "content": groq_response})

    # Use regex to extract action, params, and response from the LLM output
    action_match = re.search(r'"action":\s*"(.*?)"', groq_response)
    params_match = re.search(r'"params":\s*"(.*?)"', groq_response)
    response_match = re.search(r'"response":\s*"(.*?)"', groq_response)

    action = action_match.group(1) if action_match else ""
    params = params_match.group(1) if params_match else ""
    response = response_match.group(1) if response_match else ""

    # Return the extracted values as a JSON response
    return {
        "action": action,
        "params": params,
        "response": response
    }

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)