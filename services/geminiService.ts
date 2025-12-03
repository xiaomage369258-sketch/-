import { GoogleGenAI } from "@google/genai";
import { GenerateImageResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCryptoImage = async (prompt: string): Promise<GenerateImageResult> => {
  try {
    if (!apiKey) {
      return { imageUrl: null, error: "API Key not found. Please check your environment configuration." };
    }

    // Using gemini-2.5-flash-image for standard generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        // No responseMimeType for image generation models
        imageConfig: {
            aspectRatio: "1:1",
        }
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
       return { imageUrl: null, error: "No candidates returned from the model." };
    }

    const content = response.candidates[0].content;
    
    if (!content || !content.parts) {
        return { imageUrl: null, error: "No content parts returned." };
    }

    // Iterate through parts to find the image
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        const base64EncodeString = part.inlineData.data;
        // Assuming mimeType is image/png or image/jpeg, usually returns png
        const mimeType = part.inlineData.mimeType || 'image/png';
        const imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
        return { imageUrl, error: null };
      }
    }

    return { imageUrl: null, error: "No image data found in the response." };

  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return { 
      imageUrl: null, 
      error: err.message || "An unexpected error occurred during generation." 
    };
  }
};