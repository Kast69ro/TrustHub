import { queryGeminiAI } from "@/entities/api/check-site/check";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await queryGeminiAI(
    body.title,
    body.description,
    body.fullDescription
  );

  return Response.json(response);
}
