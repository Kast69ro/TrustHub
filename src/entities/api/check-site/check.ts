import axios from "axios";

export type AiResponse = {
  category: string;
  tags: string[];
  trustLevel: number;
  isOfficial: boolean;
  trusted?: boolean | "unknown";
};

export async function queryGeminiAI(
  title: string,
  description: string,
  fullDescription: string
): Promise<AiResponse> {
  // ✅ теперь запрос идёт в твой бэк
  const { data } = await axios.post<AiResponse>(
    "http://localhost:3001/ai/check-resource", // 👈 порт твоего Nest
    { title, description, fullDescription }
  );

  return data;
}