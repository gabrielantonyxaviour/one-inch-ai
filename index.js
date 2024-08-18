const express = require('express');

// Express Setup
const app = express();
app.use(express.json());
const port = 3000;

require("dotenv").config();
const { GROQ_API_KEY, SERPAPI_KEY } = process.env;

// GROQ Setup
const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: GROQ_API_KEY
});
const model = "llama3-70b-8192";

// External API to call
const { getJson } = require("serpapi");

async function getSearchResult(query, maxRetries = 5) {
    console.log('------- CALLING AN EXTERNAL API ----------');
    console.log('Q: ' + query);

    let retries = 0;
    while (retries < maxRetries) {
        try {
            const json = await getJson({
                engine: "google",
                api_key: SERPAPI_KEY,
                q: query,
                location: "Austin, Texas",
            });

            const answerBox = json['answer_box'];
            if (answerBox && Object.keys(answerBox).length > 0) {
                return answerBox;
            }

        } catch (e) {
            console.log('Failed running getJson method');
            console.log(e);
        }

        retries++;
        console.log(`Retrying... Attempt ${retries}/${maxRetries}`);
    }

    return null;  // Return null if no valid data is found after max retries
}

async function run_conversation(message) {
    const messages = [
        {
            "role": "system",
            "content": `1.) You are an expert in DeFi who answers users questions and could make predictions of crypto prices too.
        2.) If someone asks a query, answer them in layman terms, and add simple examples only if possible.
        3.) Keep all your responses very short and concise, providing only the necessary information.
        4.)  
        5.) IMPORTANT: Be extremely human and natural and Gen-Z-ish when you speak.
        6.) NOTE: You could call functions and use the data extracted from the getSearchResult function to answer questions that need a real-time data IF necessary`
        },
        {
            "role": "user",
            "content": message,
        }
    ];

    const tools = [
        {
            "type": "function",
            "function": {
                "name": "getSearchResult",
                "description": "Get real-time data answer from Google answer box",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "The query to search for in Google",
                        }
                    },
                    "required": ["query"],
                },
            },
        }
    ];

    const chatCompletion = await groq.chat.completions.create({
        messages,
        model,
        tools,
        tool_choice: "auto",
        max_tokens: 1000,
        temperature: 0.7
    });

    const response_message = chatCompletion.choices[0]?.message;
    const tool_calls = response_message.tool_calls;

    if (!tool_calls) {
        const respond = response_message.content;
        return respond;
    }

    const available_functions = {
        "getSearchResult": getSearchResult,
    };  // You can have multiple functions 

    for (let i = 0; i < tool_calls.length; i++) {
        const tool_call = tool_calls[i];
        const functionName = tool_call.function.name;
        const functionToCall = available_functions[functionName];
        const functionArgs = JSON.parse(tool_call.function.arguments);

        let functionResponse = null;
        while (!functionResponse) {
            functionResponse = await functionToCall(functionArgs.query);
            if (!functionResponse) {
                console.log(`No valid response for tool: ${functionName}`);
            }
        }

        messages.push({
            tool_call_id: tool_call.id,
            role: "tool",
            name: functionName,
            content: JSON.stringify(functionResponse)
        });
    }

    console.log(messages);

    const second_response = await groq.chat.completions.create({
        model,
        messages
    }).catch(async (err) => {
        if (err instanceof Groq.APIError) {
            console.log(err);
        } else {
            throw err;
        }

        return err;
    });

    const respond = second_response.choices[0]?.message.content;
    return respond;
}

app.post('/test', async (req, res) => {
    const { message } = req.body;
    const reply = await run_conversation(message);

    res.send({
        reply
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
