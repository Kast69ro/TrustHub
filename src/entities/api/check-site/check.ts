import axios from "axios";

export type AiResponse = {
  category: string;
  tags: string[];
  trustLevel: number;
  isOfficial: boolean;
  trusted?: boolean | "unknown";
};

function cleanJsonString(text: string): string {
  return text
    .trim()
    // убрать ```json или ``` в начале
    .replace(/^```json\s*/, "")
    .replace(/^```\s*/, "")
    // убрать ``` в конце
    .replace(/```$/, "")
    .trim();
}

export async function   queryGeminiAI(
  title: string,
  description: string,
  fullDescription: string
): Promise<AiResponse> {
  const prompt = `
You are an assistant that analyzes website submissions.

Title:
${title}

Description:
${description}

Full Description:
${fullDescription}

Please provide a JSON response with the following fields:
- category (one word)
- tags (array of 2 to 5 keywords)
- trustLevel (integer from 1 to 5)
- isOfficial (true or false)
- trusted (boolean or "unknown")

Return only valid JSON without any markdown, code fences, or extra text.
`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: 'AIzaSyDmOu0xHV1Og4YvXjfxt_8qRew5dJrcvqU'}, 
      }
    );

    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    const cleanedText = cleanJsonString(rawText);

    const parsed: AiResponse = JSON.parse(cleanedText);
    console.log(parsed);
    

    return parsed;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Gemini API Axios error:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    } else if (error instanceof Error) {
      console.error("Gemini API general error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to query Gemini API");
  }
}
