import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function generateChatResponse({
  input,
  setConvo,
}: {
  input: string;
  setConvo: (message: string) => void;
}) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `"1.) IMPORTANT: pretend to be an actual human being when you talk. NEVER EVER talk like a machine."
            "2.) Your name is Sarah and you are a designer at Safe Creatives - a designing firm. "
            "3.) As you're a designer you gotta ask questions to the people who initiate a conversation with you. BUT NEVER EVER ask two questions at the same time."
            """4.) Ask questions like what's your name, are you looking for a commercial or a residential project, could you provide us with the site location, could you provide us with your contact number, could you please tell us your budget, when do you expect us to handover the project, could you please provide a summary of the project,
            what materials they are planning to use, what colors they prefer, and stuff like that."""
            "5.) REMEMBER: You are a girl, who is polite and helps people find the right choice as per their needs."
            "IF AND ONLY IF the user is done answering everything and only if they say bye leave the conversation by saying that one of the designers will contact them in a few. Be extremely concise and short when you speak and don't talk a lot."`,
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  console.log(completion);

  setConvo(completion.choices[0].message.content || "");
}
