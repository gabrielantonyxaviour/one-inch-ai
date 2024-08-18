from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
import os

# Initialize FastAPI
app = FastAPI()

# Initialize Groq client
os.environ['GROQ_API_KEY'] = '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'

# Initialize the Groq client
client = Groq(api_key=os.environ['GROQ_API_KEY'])

# Define the request model
class RequestModel(BaseModel):
    user_message: str

# Define the response model
class ResponseModel(BaseModel):
    action: str
    params: list[str]

# Chain abbreviations
CHAIN_ABBREVIATIONS = {
    "Ethereum": "eth",
    "Binance Smart Chain": "bsc",
    "Polygon": "pol",
    "Arbitrum": "arb",
    "Optimism": "opt",
    "Avalanche": "avax",
    "Solana": "sol",
    "Cardano": "ada",
    "Polkadot": "dot",
    "Tezos": "tez",
    "Terra": "terra"
}

def convert_chain_name_to_abbreviation(chain_name: str) -> str:
    return CHAIN_ABBREVIATIONS.get(chain_name.strip().title(), chain_name.lower())

def parse_params(param_str: str) -> list[str]:
    # Split the params based on common delimiters and trim whitespace
    return [param.strip() for param in param_str.split(",") if param.strip()]

def format_params(params: list[str]) -> list[str]:
    formatted_params = []
    for param in params:
        # Split the parameter based on "_"
        parts = param.split("_")
        if len(parts) > 1:
            chain_part = convert_chain_name_to_abbreviation(parts[0]).lower()
            # Ensure that the tokens are correctly appended and converted to lowercase
            token_parts = "_".join(parts[1:]).lower()
            formatted_params.append(f"{chain_part}_{token_parts}")
        else:
            formatted_params.append(param.lower())
    return formatted_params

@app.post("/process", response_model=ResponseModel)
async def process_request(request: RequestModel):
    try:
        # Define the system prompt
        system_prompt = {
            "role": "system",
            "content": """
            Follow these steps strictly:
            1.) You are a DeFi specialist analyzing sentences.
            2.) Identify the action and the parameters from the user's input.
            3.) The actions you can identify are "deposit", "withdraw", "transfer", "balance", "swap", "transaction_history", "view_token_pair".
            4.) EXTREMELY IMPORTANT: The parameters depend on the action:
                - For "balance", the params are in the format "<chain>_<token>".
                - For "swap", the params are in the format "<chain>_<token_in>_<token_out>".
            5.) STRICTLY FOLLOW THE ABBREVIATIONS:
                - Ethereum: eth
                - Binance Smart Chain: bsc
                - Polygon: pol
                - Arbitrum: arb
                - Optimism: opt
                - Avalanche: avax
                - Solana: sol
                - Cardano: ada
                - Polkadot: dot
                - Tezos: tez
                - Terra: terra
            6.) NEVER add anything extra in the output. Follow the format exactly: action:"the action" params:"the param(s)".
            """
        }

        # Combine the system prompt with the user message
        messages = [
            system_prompt,
            {
                "role": "user",
                "content": request.user_message
            }
        ]

        # Send request to Groq
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=messages,
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False,
            stop=None,
        )

        # Extract the content from the response
        response_content = completion.choices[0].message.content.strip()

        # Parse the response by searching for the keywords
        if "action:" in response_content and "params:" in response_content:
            action_part = response_content.split("action:")[1].split("params:")[0].strip().strip('"').lower()
            params_part = response_content.split("params:")[1].strip().strip('[]"')
            params = parse_params(params_part)
            
            # Format parameters using chain abbreviation and lowercase conversion
            params = format_params(params)

            # Double-check for incorrect formatting and raise errors if not compliant
            for param in params:
                parts = param.split("_")
                if parts[0] not in CHAIN_ABBREVIATIONS.values():
                    raise HTTPException(status_code=500, detail=f"Chain abbreviation '{parts[0]}' is incorrect.")

            # Return the response
            return ResponseModel(action=action_part, params=params)
        else:
            raise HTTPException(status_code=500, detail="Failed to parse the response")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
