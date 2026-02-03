import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in process.env.API_KEY");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLovePoem = async (): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Roses are red, violets are blue, I don't have an API key, but I still love you! (Please configure API_KEY)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a very short, cute, funny, pixel-video-game themed love poem (max 4 lines). Mention 'player 2' or 'level up'. Do not include markdown formatting like backticks.",
      config: {
        maxOutputTokens: 100,
        temperature: 0.8,
      }
    });

    return response.text || "You are my favorite player 2!";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "Error loading love module... but I still love you!";
  }
};