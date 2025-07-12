
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedRtiResult } from '../types.ts';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    department: {
      type: Type.STRING,
      description: "The most relevant Central or State Government Department of India for the given problem. Example: 'Ministry of Health and Family Welfare' or 'Public Works Department, Delhi'.",
    },
    formalQueryHindi: {
      type: Type.STRING,
      description: "A formal, polite, and clear RTI question drafted in Hindi (Devanagari script) based on the user's problem. Structure it into specific, numbered points if possible.",
    },
    formalQueryEnglish: {
        type: Type.STRING,
        description: "An English translation of the formal Hindi RTI query.",
    }
  },
  required: ["department", "formalQueryHindi", "formalQueryEnglish"],
};

export const generateRtiDraft = async (problem: string, language: string): Promise<GeneratedRtiResult> => {
  const systemInstruction = `You are an expert AI assistant specializing in India's Right to Information (RTI) Act, 2005. Your purpose is to help Indian citizens draft effective RTI applications.
  
  Instructions:
  1. Analyze the user's problem statement carefully.
  2. Identify the single most appropriate government department (Central or State) to address the issue. Be as specific as possible.
  3. Draft a formal, clear, and polite RTI application query based on the problem. Frame it as a set of specific questions to maximize the chances of a clear response.
  4. The primary language for the generated query should be Hindi (Devanagari script), as requested by the user. Also provide an English translation.
  5. Adhere strictly to the JSON schema for the response.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User's Problem (in ${language}): "${problem}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation to ensure the result matches the expected structure
    if (result && typeof result.department === 'string' && typeof result.formalQueryHindi === 'string' && typeof result.formalQueryEnglish === 'string') {
        return result as GeneratedRtiResult;
    } else {
        throw new Error("Invalid JSON structure received from API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};