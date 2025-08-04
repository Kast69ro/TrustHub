import axios from "axios";

export interface ChatMessage {
  sender: "user" | "assistant";
  content: string;
}

export async function getAIChatResponseWithHistory(
  messages: ChatMessage[]
): Promise<string> {
  const recentMessages = messages.slice(-20);

  const historyText = recentMessages
    .map((msg) =>
      msg.sender === "user"
        ? `User: ${msg.content}`
        : `Assistant: ${msg.content}`
    )
    .join("\n");

  const prompt = `
You are TrustHub AI, a helpful and friendly assistant specialized in guiding users through digital resources and their submissions.

Respond clearly, concisely, and politely.

Detect the language the user is writing in and respond in the same language.

Do NOT use placeholders like "[перечисляет приложения]" or generic filler text. Instead, provide concrete, relevant, and specific information based on the user's request.

Use natural language without code blocks, markdown formatting, or technical jargon unless specifically asked.

Consider the following conversation history between User and Assistant:
${historyText}

Now, provide the Assistant's next reply based on this conversation, making sure to answer fully and directly.

If you don't have enough information to answer, politely ask for clarification.
`.trim();

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: {
          key: "AIzaSyDmOu0xHV1Og4YvXjfxt_8qRew5dJrcvqU",
        },
      }
    );

    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return rawText.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("AI chat Axios error:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    } else if (error instanceof Error) {
      console.error("AI chat error:", error.message);
    }
    return "Sorry, I couldn't get a response from the AI.";
  }
}
